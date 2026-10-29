using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Enkuuka.Site.Pages;

public sealed class IndexModel : PageModel
{
    public sealed record SiteCard(string Title, string Text, string Image, string Tag = "", string Region = "", string Search = "", string? Link = null, string? Credit = null)
    {
        public string ImageUrl => Image.StartsWith("/", StringComparison.Ordinal) ||
                                  Image.StartsWith("https://", StringComparison.OrdinalIgnoreCase) ||
                                  Image.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
            ? Image
            : $"/assets/images/{Uri.EscapeDataString(Image)}";
    }
    public sealed record CultureTopic(string Title, string Text, string Image, string Tag);
    public sealed record FestivalStat(string Value, string Label);
    public sealed record FestivalDay(string Label, string Title, string Intro, IReadOnlyList<SiteCard> Cards);
    public sealed record FestivalPage(string Slug, string Title, string Accent, string Eyebrow, string Intro, string Image,
        IReadOnlyList<SiteCard> Cards, IReadOnlyList<FestivalStat>? Stats = null, IReadOnlyList<FestivalDay>? Days = null)
    {
        public string ImageUrl() => $"/assets/images/{Uri.EscapeDataString(Image)}";
    }

    [BindProperty]
    public ContactDetails Contact { get; set; } = new();

    [BindProperty]
    [StringLength(70)]
    public string GuestName { get; set; } = "";

    public FestivalPage Festival { get; private set; } = Pages["home"];
    public static IReadOnlyList<CultureTopic> CultureTopics { get; } =
    [
        new("Gomesi and kanzu", "Traditional dress brings colour and dignity to cultural gatherings. The gomesi and kanzu are among Buganda’s best-known formal garments.", "/assets/images/DressCode.png", "Dress & identity"),
        new("Matoke and hospitality", "Steamed matoke is a familiar centrepiece of Buganda’s food culture, often served with sauces and other dishes. Festival vendors and menus can vary from year to year.", "/assets/images/Baganda_Food.png", "Food & hospitality"),
        new("Sport and county pride", "The Masaza Cup brings counties together through football, community support and friendly competition — a sporting expression of shared identity.", "/assets/images/MasazaCup.png", "Sport"),
        new("Music and dance", "Drums and dance carry stories across generations. Baakisimba and other traditional forms bring rhythm, movement and celebration to the gathering.", "/assets/images/maganda.png", "Music & dance")
    ];
    public bool IsHome => Festival.Slug == "home";
    public bool InvitePreview { get; private set; }
    public bool ContactSent { get; private set; }
    public string? Notice { get; private set; }

    public static readonly IReadOnlyList<(string Label, string Slug)> Navigation =
    [
        ("Home", ""), ("Culture", "culture"), ("Clans", "clans"), ("Masaza", "masaza"),
        ("Events & entertainment", "events"), ("Business", "business"),
        ("Gallery", "gallery"), ("Accommodation", "accommodation"),
        ("Invitation", "invitation"), ("Contact", "contact")
    ];

    private static readonly string[] ClanNames =
    [
        "Ffumbe", "Lugave", "Ngonge", "Njaza", "Abalangira", "Mmamba Gabunga", "Mmamba Kakoboza", "Ngo",
        "Ngabi Nnyunga", "Ngabi Nsamba", "Ngaali", "Ngeye", "Nkejje", "Njovu", "Nkima", "Mpeewo", "Mbogo",
        "Mbwa", "Nte", "Musu", "Mutima Musagi", "Mutima Omuyanja", "Kkobe", "Kasimba", "Kayozi", "Nseenene",
        "Ntalaganya", "Ndiisa", "Mpologoma", "Butiko", "Mpindi", "Nvuma", "Nkula", "Nkerebwe", "Ndiga",
        "Mazzi ga Kisasi", "Nkebuka", "Lukato", "Mbuzi", "Nvubu", "Nsuma", "Nswaswa", "Nnyonyi Nnyange",
        "Kiwere", "Babiito-Kooki", "Babiito-Kiziba", "Kibe", "Kinyomo", "Nakinsige", "Namuŋŋoona", "Nsunu", "Kasanke"
    ];

    private static readonly SiteCard[] ClanDirectory =
    [
        Clan("Ffumbe", "African Civet", "Walusimbi", "01", "civet.png"),
        Clan("Lugave", "Pangolin", "Ndugwa", "02", "pangolin.jpg"),
        Clan("Ngonge", "Otter", "Nakigoye Kisolo", "03", "otter.jpg"),
        Clan("Njaza", "Reedbuck", "Kitanda", "04", "ReedBuck.jpg"),
        Clan("Abalangira", "Royal clan", "Ssaabataka (Kabaka)", "05", "Royals.jpg"),
        Clan("Mmamba Gabunga", "Lungfish", "Gabunga", "06", "LungFish.jpg"),
        Clan("Mmamba Kakoboza", "Lungfish", "Nankere", "07", "LungFish.jpg"),
        Clan("Ngo", "Leopard", "Muteesasira", "08", "Leopard.jpg"),
        Clan("Ngabi Nnyunga", "Bushbuck", "Kannyana", "09", "BushBuck.jpg"),
        Clan("Ngabi Nsamba", "Bushbuck", "Nsamba", "10", "BushBuck.jpg"),
        Clan("Ngaali", "Crested Crane", "Mawesano", "11", "CrestedCrane.jpg"),
        Clan("Ngeye", "Colobus Monkey", "Kasujja", "12", "ColobusMonkey.jpg"),
        Clan("Nkejje", "Sprat Fish", "Kikwata", "13", "SpratFish2.jpg"),
        Clan("Njovu", "Elephant", "Mukalo", "14", "elephant.jpg"),
        Clan("Nkima", "Monkey", "Mugema", "15", "monkey.jpg"),
        Clan("Mpeewo", "Oribi Antelope", "Kiggye", "16", "Antelope.jpg"),
        Clan("Mbogo", "Buffalo", "Kayiira Gajule", "17", "Buffalo.jpg"),
        Clan("Mbwa", "Dog", "Mutasingwa", "18", "Dog.jpg"),
        Clan("Nte", "Cow", "Katongole Muggatta", "19", "cow.jpg"),
        Clan("Musu", "Cane Rat", "Muyingo", "20", "CaneRat2.png"),
        Clan("Mutima Musagi", "Heart", "Nakirembeka", "21", "Heart1.png"),
        Clan("Mutima Omuyanja", "Heart", "Namugera Kakeeto", "22", "Heart1.png"),
        Clan("Kkobe", "Creeping Plant", "Nnamwama", "23", "Kkobe.jpg"),
        Clan("Kasimba", "Genet Cat", "Kabazzi", "24", "GenetCat.jpg"),
        Clan("Kayozi", "Jerboa", "Kafumu", "25", "Jerboa.jpg"),
        Clan("Nseenene", "Grasshopper", "Kalibbala", "26", "GrassHoper.avif"),
        Clan("Ntalaganya", "Blue Duiker", "Bbambaga", "27", "Duiker.jpg"),
        Clan("Ndiisa", "Lark", "Kaliika", "28", "LarkBird.jpg"),
        Clan("Mpologoma", "Lion", "Ssebuganda Namuguzi", "29", "Lion3.jpg"),
        Clan("Butiko", "Fungus", "Ggunju", "30", "Mushroom3.png"),
        Clan("Mpindi", "Black-eyed Pea", "Mazige", "31", "Mpindi.png"),
        Clan("Nvuma", "Water Plant", "Kyaddondo", "32", "Nvuma1.png"),
        Clan("Nkula", "Red Ochre", "Muwangi", "33", "Rhinocerous.jpg"),
        Clan("Nkerebwe", "Squirrel", "Kidimbo", "34", "Squirrel.jpg"),
        Clan("Ndiga", "Sheep", "Lwomwa", "35", "Sheep1.png"),
        Clan("Mazzi ga Kisasi", "Water Droplets", "Wooyo", "36", "RainWater.png"),
        Clan("Nkebuka", "Historical", "Kayizzi", "37", "Nkebuka.png"),
        Clan("Lukato", "Historical", "Magunda", "38", "LukatoClan.jpg"),
        Clan("Mbuzi", "Goat", "Kisunsu", "39", "Goat.jpg"),
        Clan("Nvubu", "Hippo", "Kayita", "40", "Hippo.jpg"),
        Clan("Nsuma", "Snout Fish", "Kibondwe", "41", "Nsuma3.png"),
        Clan("Nswaswa", "Nile Monitor Lizard", "Mayengo", "42", "Lizard2.jpg"),
        Clan("Nnyonyi Nnyange", "Heron Bird", "Mbaziira", "43", "HeronBird2.jpg"),
        Clan("Kiwere", "Duiker", "Luwonko", "44", "Kiwere.png"),
        Clan("Babiito-Kooki", "Drum", "Ssababiito", "45", "Entenga.jpg"),
        Clan("Babiito-Kiziba", "Drum", "Lutayinzibwato", "46", "Entenga.jpg"),
        Clan("Kibe", "Fox", "Muyige", "47", "fox3.jpg"),
        Clan("Kinyomo", "Large Black Ant", "Nakigoye", "48", "BlackAnt2.png"),
        Clan("Nakinsige", "Oriole Bird", "Kyeyune", "49", "OrioleBird.jpg"),
        Clan("Namunggona", "Crow", "Kajjabwongwa", "50", "Crow.jpg"),
        Clan("Nsunu", "Uganda Kob", "Kibugaya", "51", "Kob1.jpg"),
        Clan("Kasanke", "African Firefinch", "Kyangu", "52", "Kasanke.jpg")
    ];


    private static readonly Dictionary<string, FestivalPage> Pages = new(StringComparer.OrdinalIgnoreCase)
    {
        ["home"] = new("home", "Enkuuka", "y’Omwaka", "Lubiri Palace · Mengo · Kampala",
            "The royal Buganda New Year festival. Two days of heritage, trade, music and celebration at Lubiri Palace.",
            "king_Saha.png", [
                Card("Royal drumming", "The rhythms of the kingdom open a day of music and ceremony.", "Maganda.jpeg", "Culture"),
                Card("A kingdom in colour", "Meet the clans, traditions and stories that make Buganda.", "Cultural_Exhibition.png", "Heritage"),
                Card("The Masaza Cup", "The counties come together through a much-loved football tradition.", "MasazaCup.png", "Sport"),
                Card("A night at Lubiri", "Celebrate the turning of the year with music beneath the palace sky.", "Enkkuka_Atmosphere.png", "Festival")
            ], [new("52", "Buganda clans"), new("18", "Masaza counties"), new("1", "Kingdom, together")]),
        ["culture"] = new("culture", "Buganda", "culture and heritage", "Show culture · Have heritage",
            "A living heritage carried through royal ceremony, dance, music, craft, food and the stories of the Baganda.", "Buganda.png", [
                Card("Gomesi and kanzu", "Traditional dress brings colour and dignity to cultural gatherings.", "DressCode.png", "Dress"),
                Card("Matoke and hospitality", "Steamed matoke is a familiar centrepiece of Buganda’s food culture, often served with sauces and other dishes.", "Baganda_Food.png", "Food"),
                Card("Sport and county pride", "The Masaza Cup brings counties together through football and community support.", "MasazaCup.png", "Sport"),
                Card("Music and dance", "Baakisimba and other traditional forms carry stories through rhythm and movement.", "maganda.png", "Music"),
                Card("Bark cloth · Olubugo", "Handcrafted from the mutuba fig tree, bark cloth remains a defining cultural textile.", "Barkcloth.png", "Craft"),
                Card("The Kabaka", "The Kabaka is the living embodiment of the kingdom and a guardian of Kiganda tradition.", "Kabaka.png", "Royalty")
            ]),
        ["clans"] = new("clans", "The 52", "clans of Buganda", "Identity · Kinship · Belonging",
            "Every clan carries its own totem, history and responsibilities. Search the list to find a clan by name.", "Clans.png",
            ClanDirectory),
        ["masaza"] = new("masaza", "The 18", "Masaza counties", "The kingdom across its counties",
            "Explore the counties, their cultural centres and the places that connect each Masaza to Buganda.", "BugandaMap.png", [
                Card("Kyaddondo", "Home to Kampala and the royal heartland of Lubiri Palace.", "Kampala_Kyadondo.jpg", "Central", "Central"),
                Card("Busiro", "An ancient heartland and home to the Kasubi Royal Tombs.", "MengoPalace_Busiro.jpg", "Central", "Central"),
                Card("Kyaggwe", "Eastern Buganda, known for fertile land and Ssezibwa Falls.", "SsezibwaFalls_Kyagwe1.jpg", "Eastern", "Eastern"),
                Card("Buddu", "A fertile agricultural region around Masaka and the Katonga River.", "KitovuCathedral_Buddu.png", "Southern", "Southern"),
                Card("Ssingo", "A broad northern county with tea-growing communities around Mityana.", "MityanaTeaEstate_Ssingo.png", "Northern", "Northern"),
                Card("Mawokota", "Lakeside communities and the Uganda Equator landmark.", "Equator_Mawokota.jpg", "Central-West", "Central-West"),
                Card("Busujju", "Traditional countryside with deep cultural roots.", "BwindiForest_Busujju2.jpg", "Western", "Western"),
                Card("Bulemeezi", "A north-western county known for pineapple farming.", "Pineapple_Bulemeezi.png", "Northwest", "Northwest"),
                Card("Buluuli", "Savannah grasslands and pastoral communities near Lake Kyoga.", "Grazing_Buluuli1.jpg", "North", "North"),
                Card("Bugerere", "An agricultural hub in the north-east of the kingdom.", "SugarcaneFields_Bugerere.png", "Northeast", "Northeast"),
                Card("Gomba", "South-western grazing country with a strong pastoral identity.", "Grazing_Gomba.jpg", "Southwest", "Southwest"),
                Card("Butambala", "A culturally rich county with traditional homesteads.", "Ginger_Butambala.png", "Central", "Central"),
                Card("Buwekula", "Rolling hills and sacred traditional sites near Mubende.", "NakayimaTree_Buweekula.jpg", "Northwest", "Northwest"),
                Card("Kabula", "A southern county shaped by coffee growing and agriculture.", "Grazing_Kabula.jpg", "Southern", "Southern"),
                Card("Kooki", "A south-western county with a distinctive sub-kingdom history.", "Boarder_Kooki.png", "Southwest", "Southwest"),
                Card("Mawogola", "Open grazing land and cattle-keeping communities.", "Grazing_Mawogola.jpg", "South", "South"),
                Card("Ssese", "Lake Victoria islands with palm beaches and spiritual heritage.", "Beach_Ssese.jpg", "Islands", "Islands"),
                Card("Buvuma", "Island communities whose lives are closely tied to fishing.", "Fishing_Buvuma.png", "Islands", "Islands")
            ]),
        ["entertainment"] = new("entertainment", "Music, dance", "and celebration", "On stage at Enkuuka",
            "From royal drumming and cultural dance to Uganda’s favourite performers, the celebration carries on into the night.", "Afrigo_Band.png", [
                Card("Afrigo Band", "A legendary Ugandan band bringing generations together through music.", "Afrigo_Band.png", "Live music"),
                Card("Royal drummers", "The engalabi and empuunyi set the pulse for the kingdom’s celebration.", "Maganda.jpeg", "Tradition"),
                Card("Dance troupes", "Baakisimba, Nankasa and Mbaga performed in full cultural regalia.", "maganda.png", "Dance"),
                Card("The main stage", "A night of live performances and shared celebration at Lubiri.", "Enkkuka_Atmosphere.png", "Festival")
            ]),
        ["events-legacy"] = new("events-legacy", "A day at", "the palace", "The Enkuuka programme",
            "Follow the celebration from the opening of the gates through cultural performances, the evening concert and the midnight countdown.", "CountDown.png", [
                Card("8:00 AM · Royal arrival", "The day opens with a royal welcome at Lubiri Palace.", "Kabaka.png", "Morning"),
                Card("9:00 AM · Gates open", "Guests enter the grounds for the cultural exhibition, trade fair and performances.", "crowd.png", "Morning"),
                Card("12:00 PM · Cultural performances", "Baakisimba, Nankasa and Mbaga bring the kingdom’s dances to the stage.", "Cultural_Exhibition.png", "Midday"),
                Card("2:00 PM · Royal address", "A moment for reflection, announcements and a message to the people.", "Kabaka.png", "Afternoon"),
                Card("5:00 PM · Sunset concert", "Ugandan artists take the stage as evening settles over Mengo.", "Afrigo_Band.png", "Evening"),
                Card("Midnight · New year", "The crowd welcomes a new year together at the palace.", "CountDown.png", "Night")
            ]),
        ["events"] = new("events", "Two days at", "the palace", "Trade fair · Culture · Celebration",
            "Enkuuka unfolds across two days: a dedicated trade fair, followed by a day of cultural celebration and live entertainment.", "Enkkuka_Atmosphere.png", [], Days: [
                new("Day 1 · 30 December", "Trade fair", "Discover Ugandan businesses, food, crafts and cultural exhibits in the marketplace at Lubiri.", [
                    Card("The Enkuuka marketplace", "Meet local makers, vendors and businesses bringing their work to the festival.", "trade.png", "Trade fair"),
                    Card("Matoke and local food", "Explore matoke and other food products represented by businesses across the kingdom.", "Baganda_Food.png", "Food & trade"),
                    Card("Culture on display", "See Buganda heritage, crafts and cultural exhibits shared with visitors.", "Cultural_Exhibition.png", "Exhibition")
                ]),
                new("Day 2 · 31 December", "Celebrations", "A full festival day of Buganda heritage, performance, music and the New Year welcome.", [
                    new SiteCard("Entanda ya Buganda", "A celebration of knowledge and cultural heritage, with competition finalists recognised at Enkuuka.", "entanda_ya_buganda2.png", "Heritage", Link: "https://cbsfm.ug/news/entanda-ya-buganda-2025-etongozeddwa-ku-kitebe-kya-mtn-uganda-yeyamye-okwongera-okukwasizaako-cbs-okutumbula-olulimi-nobuwangwa", Credit: "CBS FM · Entanda ya Buganda 2025"),
                    Card("Royal drumming and dance", "Traditional rhythms and dance bring Buganda's living culture to the festival.", "Maganda.jpeg", "Culture"),
                    Card("Live music", "Ugandan performers bring the celebration together at Lubiri Palace.", "Afrigo_Band.png", "Entertainment"),
                    Card("Welcome the New Year", "Join the crowd for the shared New Year celebration at the palace.", "CountDown.png", "Celebration")
                ])
            ]),
        ["business"] = new("business", "A marketplace", "with purpose", "Trade fair · Enterprise · Opportunity",
            "Enkuuka brings businesses, makers and visitors together under the royal roof. Find out how to take part in the trade fair.", "pewosa-tradefair-lubiri-2025-uzima.jpg", [
                new SiteCard("Exhibitors at the fair", "Meet local businesses as they demonstrate products and connect with visitors at the Lubiri fairground.", "pewosa-tradefair-lubiri-2025-uzima.jpg", "CBS PEWOSA · 2025", Link: "https://www.linkedin.com/posts/uzimachickenltd_our-team-in-uganda-is-attending-the-cbs-pewosa-activity-7341048891770875906-DygL", Credit: "Uzima Chicken · CBS PEWOSA Trade Fair, June 2025"),
                new SiteCard("Local makers and craft", "Explore handmade goods and products presented by community enterprises at the Lubiri trade fair.", "pewosa-tradefair-lubiri-2023-makers.jpg", "Lubiri · 2023", Link: "https://www.peernation.org/discover-the-vibrant-products-and-services-of-peer-nation-through-the-cbs-pewosa-trade-fair-2023-in-lubiri-palace-mengo/", Credit: "Peer Nation · CBS PEWOSA Trade Fair, 2023"),
                new SiteCard("Inside the exhibition tents", "Browse colourful stalls, meet exhibitors and discover products from across the community.", "pewosa-tradefair-lubiri-2023-exhibition.jpg", "Lubiri · 2023", Link: "https://www.peernation.org/discover-the-vibrant-products-and-services-of-peer-nation-through-the-cbs-pewosa-trade-fair-2023-in-lubiri-palace-mengo/", Credit: "Peer Nation · CBS PEWOSA Trade Fair, 2023"),
                new SiteCard("A marketplace of ideas", "Small businesses share what they make and build new connections with fair visitors.", "pewosa-tradefair-lubiri-2023-market.jpg", "Lubiri · 2023", Link: "https://www.peernation.org/discover-the-vibrant-products-and-services-of-peer-nation-through-the-cbs-pewosa-trade-fair-2023-in-lubiri-palace-mengo/", Credit: "Peer Nation · CBS PEWOSA Trade Fair, 2023"),
                Card("Matoke and local food", "Discover matoke and other food enterprises represented in the marketplace.", "Baganda_Food.png", "Food & produce"),
                Card("Cultural displays", "Meet artisans and explore cultural objects and craft traditions alongside the fair’s business stalls.", "Cultural_Exhibition.png", "Culture & craft")
            ]),
        ["programme-legacy"] = new("programme-legacy", "The festival", "programme", "Make a day of it",
            "Plan your visit around the main moments of the celebration. Times are a guide and may change on the day.", "CountDown.png", [
                Card("8:00 AM", "Royal arrival and welcome at Lubiri Palace.", "Kabaka.png", "Morning"),
                Card("9:00 AM", "Festival gates open. Visit the cultural exhibition and marketplace.", "crowd.png", "Morning"),
                Card("12:00 PM", "Royal drumming and traditional dance performances.", "Maganda.jpeg", "Midday"),
                Card("2:00 PM", "Royal address and kingdom announcements.", "Kabaka.png", "Afternoon"),
                Card("5:00 PM", "Sunset concert featuring Ugandan artists.", "Afrigo_Band.png", "Evening"),
                Card("11:45 PM", "The final countdown to the new year.", "CountDown.png", "Night")
            ]),
        ["gallery"] = new("gallery", "Moments from", "Buganda", "People · Place · Celebration",
            "A glimpse of the landscapes, traditions and people that make Enkuuka y’Omwaka special. Select an image to view it larger.", "Enkkuka_Atmosphere.png", [
                Card("The celebration", "Lubiri Palace · Mengo", "Enkkuka_Atmosphere.png", "Festival"),
                Card("The Kabaka", "A royal moment", "Kabaka.png", "Royalty"),
                Card("Royal drumming", "Rhythm and ceremony", "Maganda.jpeg", "Culture"),
                Card("Buganda", "The kingdom and its people", "Buganda.png", "Kingdom"),
                Card("The Masaza Cup", "A celebration of county pride", "MasazaCup.png", "Sport"),
                Card("The royal clans", "Identity across generations", "Clans.png", "Heritage"),
                Card("Cultural exhibition", "Tradition shared with visitors", "Cultural_Exhibition.png", "Culture"),
                Card("A night at Lubiri", "The festival after sunset", "CountDown.png", "Night"),
                Card("The marketplace", "Enterprise and local makers", "trade.png", "Business"),
                new SiteCard("Entanda ya Buganda", "Knowledge and heritage celebrated at Enkuuka.", "entanda_ya_buganda2.png", "Tradition", Link: "https://cbsfm.ug/news/entanda-ya-buganda-2025-etongozeddwa-ku-kitebe-kya-mtn-uganda-yeyamye-okwongera-okukwasizaako-cbs-okutumbula-olulimi-nobuwangwa", Credit: "CBS FM · Entanda ya Buganda 2025")
            ]),
        ["accommodation"] = new("accommodation", "Stay near", "the celebration", "Plan your visit to Mengo",
            "These real properties are in Mengo or close to Lubiri Palace. Contact each hotel directly to confirm availability, rates and transport.", "Enkkuka_Atmosphere.png", [
                new SiteCard("Kenlon Hotel Royal", "Mengo · On Lubiri Ring Road, opposite the palace grounds.", "https://res.klook.com/klook-hotel/image/upload/fl_lossy.progressive%2Cw_1200%2Ch_630%2Cc_fill%2Cq_85/travelapi/67000000/66720000/66710200/66710159/74afaa68_z.jpg", "Across from Lubiri", Link: "https://www.klook.com/en-US/hotels/detail/695680-kenlon-hotel/", Credit: "Photo: Klook hotel listing"),
                new SiteCard("Vision Hotel", "Mengo · A hotel in the neighbourhood around the palace.", "https://www.visionhotelmengo.com/images/Gallery/Vision_hotel_Compound_2.jpg", "Mengo", Link: "https://www.visionhotelmengo.com/", Credit: "Photo: Vision Hotel"),
                new SiteCard("Super Paradise Hotel", "Mengo · On Sir Albert Cook Road, near the palace.", "https://super-paradise-sir-albert-cook-road-mengo-kampala-ug.kampala-hotels-ug.com/data/Photos/OriginalPhoto/7842/784280/784280277/kampala-super-paradise-hotel-photo-1.JPEG", "Mengo", Link: "https://superparadisehotel.com/branches/mengo/", Credit: "Photo: hotel property listing")
            ]),
        ["invitation"] = new("invitation", "Your royal", "invitation", "A personal welcome to Enkuuka",
            "Create a personal invitation to share with family and friends.", "Buganda.png", []),
        ["contact"] = new("contact", "Get in", "touch", "We are here to help",
            "For vendor enquiries, sponsorships, media partnerships or general information about Enkuuka y’Omwaka.", "Buganda.png", [])
    };

    public IActionResult OnGet(string? slug, string? guest, bool? sent)
    {
        if (string.Equals(slug, "programme", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(slug, "entertainment", StringComparison.OrdinalIgnoreCase))
            return RedirectPermanent("/events");

        Festival = GetPage(slug);
        GuestName = guest ?? "";
        InvitePreview = Festival.Slug == "invitation" && !string.IsNullOrWhiteSpace(GuestName);
        ContactSent = sent == true;
        return Page();
    }

    public IActionResult OnPostInvitation(string? slug)
    {
        Festival = GetPage(slug);
        InvitePreview = true;
        if (!ModelState.IsValid)
            return Page();

        return Page();
    }

    public IActionResult OnPostContact(string? slug)
    {
        Festival = GetPage(slug);
        if (!ModelState.IsValid)
            return Page();

        ContactSent = true;
        Notice = "Thank you. Your message has been recorded for the Enkuuka team.";
        return Page();
    }

    public static FestivalPage GetPage(string? slug) =>
        Pages.TryGetValue(string.IsNullOrWhiteSpace(slug) ? "home" : slug, out var page) ? page : Pages["home"];

    private static SiteCard Card(string title, string text, string image, string tag = "", string region = "") =>
        new(title, text, $"/assets/images/{Uri.EscapeDataString(image)}", tag, region);

    private static SiteCard Clan(string name, string totem, string head, string number, string image) =>
        new(name, $"Clan head: {head}", $"/assets/images/{Uri.EscapeDataString(image)}", $"Clan {number}", head, totem);

    public sealed class ContactDetails
    {
        [Required, StringLength(80)]
        public string Name { get; set; } = "";

        [Required, EmailAddress, StringLength(160)]
        public string Email { get; set; } = "";

        [Required, StringLength(120)]
        public string Subject { get; set; } = "";

        [Required, StringLength(3000)]
        public string Message { get; set; } = "";
    }
}
