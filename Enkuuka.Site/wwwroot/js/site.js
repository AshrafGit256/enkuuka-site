(() => {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu?.classList.toggle("is-open", open);
  });
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  }));

  const days = document.querySelector("[data-days]");
  if (days) {
    const updateCountdown = () => {
      const now = new Date();
      let target = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      if (target <= now) target = new Date(now.getFullYear() + 1, 11, 31, 23, 59, 59);
      const remaining = Math.max(0, target - now);
      const parts = {
        days: Math.floor(remaining / 86400000),
        hours: Math.floor((remaining % 86400000) / 3600000),
        minutes: Math.floor((remaining % 3600000) / 60000),
        seconds: Math.floor((remaining % 60000) / 1000)
      };
      for (const [key, value] of Object.entries(parts)) {
        const node = document.querySelector(`[data-${key}]`);
        if (node) node.textContent = String(value).padStart(key === "days" ? 3 : 2, "0");
      }
    };
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  const search = document.querySelector("#collection-search");
  if (search) {
    const cards = [...document.querySelectorAll("[data-card]")];
    const count = document.querySelector("#result-count");
    const empty = document.querySelector("[data-empty]");
    const update = () => {
      const term = search.value.trim().toLocaleLowerCase();
      let shown = 0;
      cards.forEach(card => {
        const matches = card.dataset.search.toLocaleLowerCase().includes(term);
        card.hidden = !matches;
        if (matches) shown++;
      });
      if (count) count.textContent = `${shown} ${shown === 1 ? "entry" : "entries"}`;
      if (empty) empty.hidden = shown > 0;
    };
    search.addEventListener("input", update);
  }

  const clanCards = [...document.querySelectorAll("[data-clan-entry]")];
  if (clanCards.length) {
    const nameSearch = document.querySelector("#name-search");
    const nameCount = document.querySelector("#name-count");
    const nameResults = document.querySelector("#name-results");
    const selectedPanel = document.querySelector("#clan-selected-names");
    const selectedKicker = document.querySelector("[data-selected-clan-kicker]");
    const selectedTitle = document.querySelector("[data-selected-clan-title]");
    const selectedSummary = document.querySelector("[data-selected-clan-summary]");
    const selectedList = document.querySelector("[data-selected-clan-list]");
    const closeSelectedButton = document.querySelector("[data-close-clan-names]");
    let nameRecords = [];
    let namesLoaded = false;
    let namesFailed = false;
    const clanNames = new Map(clanCards.map(card => [card.dataset.title, new Set()]));

    const clean = value => value
      .replace(/\u014b\u014b/gi, "ng")
      .replace(/\u014b/gi, "ng")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const broadGroups = {
      bammamba: ["Mmamba Gabunga", "Mmamba Kakoboza"],
      bangabi: ["Ngabi Nnyunga", "Ngabi Nsamba"],
      bamutima: ["Mutima Musagi", "Mutima Omuyanja"],
      babiito: ["Babiito-Kooki", "Babiito-Kiziba"]
    };
    const reviewedVariants = {
      balangira: "Abalangira",
      bannyange: "Nnyonyi Nnyange",
      bampini: "Mpindi",
      aboolukato: "Lukato"
    };
    const reviewedAssociations = {
      baffumbe: "Ffumbe",
      balugave: "Lugave",
      bango: "Ngo",
      banjovu: "Njovu",
      bante: "Nte",
      bangeye: "Ngeye",
      bandiga: "Ndiga",
      bampologoma: "Mpologoma"
    };
    const clanByName = name => clanCards.find(card => card.dataset.title === name);
    const associatedClans = sourceLabel => {
      const matches = new Map();
      const components = sourceLabel.replace(/\s*,\s*(?=n['’])/gi, " ").split(/\s+n['’]\s*|\s*,\s*/i);
      for (const component of components) {
        const label = clean(component);
        for (const name of broadGroups[label] || []) {
          const clan = clanByName(name);
          if (clan) matches.set(name, clan);
        }
        for (const name of [reviewedVariants[label], reviewedAssociations[label], label === "ekirangira" || label === "kirangira" ? "Kirangira (workbook only)" : null]) {
          if (!name) continue;
          const clan = clanByName(name);
          if (clan) matches.set(name, clan);
          else if (name.includes("workbook")) matches.set(name, { dataset: { title: name, number: "" } });
        }
        const alternatives = [label, label.replace(/^aba/, ""), label.replace(/^ab/, ""), label.replace(/^baa?/, ""), label.replace(/^ba/, "")];
        for (const value of alternatives) {
          const reduced = value.replace(/([a-z])\1/g, "$1");
          const clan = clanCards.find(card => {
            const official = clean(card.dataset.title);
            return [official, official.replace(/([a-z])\1/g, "$1")].includes(reduced);
          });
          if (clan) matches.set(clan.dataset.title, clan);
        }
      }
      return [...matches.values()];
    };
    const closeSelectedClan = () => {
      selectedPanel.hidden = true;
      clanCards.forEach(card => {
        card.classList.remove("is-selected");
        card.setAttribute("aria-expanded", "false");
      });
    };
    const selectClan = (clan, shouldScroll = false) => {
      selectedKicker.textContent = "EKIKA · CLAN " + clan.dataset.number;
      selectedTitle.textContent = clan.dataset.title;
      selectedList.replaceChildren();
      const names = [...(clanNames.get(clan.dataset.title) || [])]
        .sort((first, second) => first.localeCompare(second, "lg", { sensitivity: "base" }));
      selectedSummary.textContent = names.length
        ? names.length + " personal names with a recorded association to this clan."
        : "No personal names for this clan are recorded in the current names collection.";
      if (names.length) {
        names.forEach(name => {
          const item = document.createElement("li");
          item.textContent = name;
          selectedList.append(item);
        });
      } else {
        const item = document.createElement("li");
        item.className = "clan-selected-empty";
        item.textContent = "No names available in this collection yet.";
        selectedList.append(item);
      }
      selectedPanel.hidden = false;
      clanCards.forEach(card => {
        const isSelected = card === clan;
        card.classList.toggle("is-selected", isSelected);
        card.setAttribute("aria-expanded", String(isSelected));
      });
      if (shouldScroll) {
        window.requestAnimationFrame(() => selectedPanel.scrollIntoView({ behavior: "smooth", block: "nearest" }));
      }
    };
    const toggleClan = clan => {
      if (!selectedPanel.hidden && clan.classList.contains("is-selected")) closeSelectedClan();
      else selectClan(clan, true);
    };
    clanCards.forEach(clan => {
      clan.addEventListener("click", () => toggleClan(clan));
      clan.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleClan(clan);
        }
      });
    });
    closeSelectedButton.addEventListener("click", closeSelectedClan);
    const renderNames = value => {
      const term = value.trim().toLocaleLowerCase();
      nameResults.replaceChildren();
      nameResults.hidden = true;
      if (term.length < 2) {
        nameCount.textContent = "Enter at least 2 letters to search the collection";
        return;
      }
      if (namesFailed) {
        nameCount.textContent = "The name collection could not be loaded. Try again after refreshing.";
        return;
      }
      if (!namesLoaded) {
        nameCount.textContent = "Loading the names collection…";
        return;
      }
      const normalizedTerm = clean(term);
      const results = nameRecords.filter(([name]) => clean(name).includes(normalizedTerm)).slice(0, 80);
      nameCount.textContent = results.length + (results.length === 80 ? "+ (showing first 80)" : "") + " matching names";
      nameResults.hidden = false;
      const heading = document.createElement("h3");
      heading.textContent = results.length ? "Names found in the collection" : "No matching names found";
      nameResults.append(heading);
      if (!results.length) {
        const empty = document.createElement("p");
        empty.textContent = "Try another spelling or search with the first few letters.";
        nameResults.append(empty);
      }
      const list = document.createElement("div");
      list.className = "name-result-list";
      for (const [name, association, gender] of results) {
        const row = document.createElement("div");
        row.className = "name-result";
        const nameNode = document.createElement("strong");
        nameNode.textContent = name;
        const associationNode = document.createElement("span");
        associationNode.textContent = "Recorded association: " + association + (gender === "m" ? " · Male" : gender === "f" ? " · Female" : "");
        const matchesNode = document.createElement("div");
        matchesNode.className = "clan-match-links";
        const matches = associatedClans(association);
        if (!matches.length) {
          const unverified = document.createElement("span");
          unverified.textContent = "No direct match in the published 52-clan directory";
          matchesNode.append(unverified);
        }
        for (const clan of matches) {
          if (!clan.dataset.number) {
            const label = document.createElement("span");
            label.textContent = clan.dataset.title;
            matchesNode.append(label);
            continue;
          }
          const link = document.createElement("a");
          link.href = "#clan-selected-names";
          link.textContent = clan.dataset.title;
          link.addEventListener("click", event => {
            event.preventDefault();
            selectClan(clan, true);
          });
          matchesNode.append(link);
        }
        row.append(nameNode, associationNode, matchesNode);
        list.append(row);
      }
      if (results.length) nameResults.append(list);
      const caution = document.createElement("p");
      caution.className = "association-note";
      caution.textContent = "These are associations recorded in the source names collection, not proof of a person’s clan or branch. Confirm family heritage with elders; some records refer to a wider group.";
      nameResults.append(caution);
    };

    nameSearch.addEventListener("input", () => {
      closeSelectedClan();
      renderNames(nameSearch.value);
    });
    fetch("/assets/data/baganda-names.json")
      .then(response => {
        if (!response.ok) throw new Error("Name data unavailable");
        return response.json();
      })
      .then(records => {
        nameRecords = records.filter(record => Array.isArray(record) && record.length >= 2);
        namesLoaded = true;
        nameRecords.forEach(([name, association]) => {
          associatedClans(association).forEach(clan => {
            const clanNameSet = clanNames.get(clan.dataset.title);
            if (clanNameSet) clanNameSet.add(name);
          });
        });
        const selectedClan = clanCards.find(card => card.classList.contains("is-selected"));
        if (selectedClan) selectClan(selectedClan);
        nameCount.textContent = nameRecords.length.toLocaleString() + " names in the collection";
        if (nameSearch.value.trim()) renderNames(nameSearch.value);
      })
      .catch(() => {
        namesFailed = true;
        if (nameSearch.value.trim()) renderNames(nameSearch.value);
        else nameCount.textContent = "The name collection could not be loaded. Try again after refreshing.";
      });
  }

  const dialog = document.querySelector("[data-lightbox-dialog]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxTitle = document.querySelector("[data-lightbox-title]");
  document.querySelectorAll("[data-lightbox]").forEach(button => button.addEventListener("click", () => {
    if (!dialog || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.dataset.title || "Festival photograph";
    if (lightboxTitle) lightboxTitle.textContent = button.dataset.title || "";
    dialog.showModal();
  }));
  document.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

  document.querySelector("[data-share]")?.addEventListener("click", async () => {
    const invitation = document.querySelector("#invitation-card");
    const text = invitation?.innerText || "Join us at Enkuuka y’Omwaka, Lubiri Palace, Mengo.";
    if (navigator.share) {
      try { await navigator.share({ title: "Enkuuka y’Omwaka", text, url: location.href }); } catch { /* Share sheet dismissed. */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text}\n${location.href}`);
      const button = document.querySelector("[data-share]");
      if (button) button.textContent = "Invitation copied";
    }
  });

  const radio = document.querySelector("[data-radio-player]");
  const radioAudio = document.querySelector("[data-radio-audio]");
  const radioStation = document.querySelector("[data-radio-station]");
  const radioToggle = document.querySelector("[data-radio-toggle]");
  const radioVolume = document.querySelector("[data-radio-volume]");
  const radioStatus = document.querySelector("[data-radio-status]");
  if (radio && radioAudio && radioStation && radioToggle) {
    const stationName = () => radioStation.selectedOptions[0]?.textContent?.trim() || "CBS FM";
    const showStatus = message => { if (radioStatus) radioStatus.textContent = message; };
    const updateButton = playing => {
      radioToggle.textContent = playing ? "Pause" : "Play";
      radioToggle.setAttribute("aria-label", playing ? "Pause CBS FM" : "Play CBS FM");
      radioToggle.setAttribute("aria-pressed", String(playing));
      radio.classList.toggle("is-playing", playing);
    };

    radioAudio.volume = Number(radioVolume?.value ?? 0.8);
    radioToggle.addEventListener("click", async () => {
      if (!radioAudio.paused) {
        radioAudio.pause();
        return;
      }
      showStatus(`Connecting to ${stationName()}…`);
      try {
        await radioAudio.play();
      } catch {
        updateButton(false);
        showStatus("Could not start the stream. Try the CBS FM website.");
      }
    });

    radioStation.addEventListener("change", async () => {
      const wasPlaying = !radioAudio.paused;
      radioAudio.pause();
      radioAudio.src = radioStation.value;
      radioAudio.load();
      updateButton(false);
      if (wasPlaying) {
        showStatus(`Connecting to ${stationName()}…`);
        try { await radioAudio.play(); }
        catch {
          updateButton(false);
          showStatus("Could not start the stream. Try the CBS FM website.");
        }
      } else {
        showStatus(`${stationName()} selected · press play to listen.`);
      }
    });

    radioVolume?.addEventListener("input", () => { radioAudio.volume = Number(radioVolume.value); });
    radioAudio.addEventListener("playing", () => {
      updateButton(true);
      showStatus(`Live · ${stationName()}`);
    });
    radioAudio.addEventListener("waiting", () => {
      if (!radioAudio.paused) showStatus(`Connecting to ${stationName()}…`);
    });
    radioAudio.addEventListener("pause", () => {
      updateButton(false);
      showStatus("Radio paused.");
    });
    radioAudio.addEventListener("error", () => {
      updateButton(false);
      showStatus("This stream is unavailable right now. Try the CBS FM website.");
    });
  }
})();
