using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Net.Sockets;
using Bogus;
using HelpMeApp.DatabaseAccess.Entities.AdvertEntity;
using HelpMeApp.DatabaseAccess.Entities.AppUserEntity;
using HelpMeApp.DatabaseAccess.Entities.CategoryEntity;
using HelpMeApp.DatabaseAccess.Entities.ChatEntity;
using HelpMeApp.DatabaseAccess.Entities.HelpTypeEntity;
using HelpMeApp.DatabaseAccess.Entities.MessageEntity;
using HelpMeApp.DatabaseAccess.Entities.ReportEntity;
using HelpMeApp.DatabaseAccess.Entities.SenderRoleEntity;
using HelpMeApp.DatabaseAccess.Entities.TermsEntity;
using Microsoft.AspNetCore.Identity;

namespace HelpMeApp.DatabaseAccess.Seeders
{
    public static class DatabaseSeeder
    {
        public static List<Advert> Adverts = new List<Advert>();
        public static List<AppUser> AppUsers = new List<AppUser>();
        public static List<Chat> Chats = new List<Chat>();
        public static List<Message> Messages = new List<Message>();
        public static List<Report> Reports = new List<Report>();

        public static bool IsCalled = false;

        public static List<IdentityRole<Guid>> IdentityRoles = new List<IdentityRole<Guid>>()
        {
            new IdentityRole<Guid>() { Name = "User", NormalizedName = "User" },
            new IdentityRole<Guid>() { Name = "Admin", NormalizedName = "Admin" },
        };

        public static List<IdentityUserRole<Guid>> IdentityUserRoles = new List<IdentityUserRole<Guid>>();

        public static List<Category> Categories = new List<Category>()
        {
            new Category(){ Name = "TV" },
            new Category(){ Name = "Smartphones" },
            new Category(){ Name = "Computers" },
            new Category(){ Name = "Laptops" }
        };

        public static List<HelpType> HelpTypes = new List<HelpType>()
        {
            new HelpType(){ Name = "Want to buy" },
            new HelpType(){ Name = "Want to sell" }
        };

        public static List<SenderRole> SenderRoles = new List<SenderRole>()
        {
            new SenderRole(){ Name = "Creator" },
            new SenderRole(){ Name = "Responder" },
            new SenderRole(){ Name = "System" }
        };

        public static List<Terms> Terms = new List<Terms>()
        {
            new Terms(){ From = "1", Till = "2" },
            new Terms(){ From = "3", Till = "4" },
            new Terms(){ From = "5", Till = "7" },
            new Terms(){ From = "10", Till = "20" },
            new Terms(){ From = "21", Till = "30" },
        };

        public static void Init()
        {
            Randomizer.Seed = new Random(10000);

            var advertHeadersCanHelp = new[] {
                "Zipper", "Box", "Lamp", "Shade", "Wallet", "Shampoo", "Chocolate", "Puddle",
                "Toothpaste", "Seat", "Belt", "Paint", "Brush", "Knife", "Shoes"
            };

            var advertHeadersNeedsHelp = new[] {
                "Pencil", "Pool", "Stick", "Outlet", "Twister", "Conditioner", "Socks", "Paint", "Brush", "Knife", "Shoes"
            };

            var Towns = new[]
            {
                "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin", "Bydgoszcz", "Lublin", "Białystok", "Katowice"
            };

            var personalInfo = new[]
            {
                "Hi, I am a mechanic. In my free time, I enjoy hiking and exploring nature.",
                "I am a teacher. I love to read books and watch movies to relax.",
                "Hello, I am a software engineer. I am also an avid gamer and love to play video games.",
                "I am a painter. In my free time, I enjoy playing the piano and composing music.",
                "I am a musician. I also love to cook and experiment with new recipes.",
                "Hello, I am a chef. I enjoy practicing yoga and meditation to stay calm and focused.",
                "I am a student. I love to play basketball and stay active in my free time.",
                "I am a nurse. I enjoy practicing calligraphy and creating beautiful lettering.",
                "Hi, I am a soccer player. In my free time, I enjoy reading and writing poetry.",
                "I am a journalist. I love to travel and explore different cultures and cuisines.",
                "Hi, I am a carpenter. In my free time, I enjoy woodworking and building furniture for my home.",
                "I am a graphic designer. I also love to go on hikes and take photographs of the beautiful scenery.",
                "Hello, I am a baker. I enjoy playing guitar and writing songs in my free time.",
                "I am a writer. In my free time, I like to paint and express my creativity in a different way.",
                "I am a doctor. I also love to dance and attend salsa classes in my free time.",
                "Hello, I am a web developer. I enjoy practicing martial arts and staying active and fit.",
                "I am a sales representative. I love to play chess and participate in local tournaments.",
                "I am a therapist. In my free time, I enjoy gardening and growing my own fruits and vegetables.",
                "Hi, I am a construction worker. I enjoy playing basketball and watching sports with my friends.",
                "I am an accountant. I love to read and learn about new financial strategies and investments."
            };

            var phoneNumbers = new[]
            {
                "+48 69 357 8417", "+48 69 799 4560", "+48 69 301 0250", "+48 69 477 9275", "+48 69 094 5549", "+48 69 923 8577"
            };

            var reportFaker = new Faker<Report>()
                .RuleFor(r => r.Text, f => f.Lorem.Sentences(f.Random.Number(1, 5)));

            Reports.AddRange(reportFaker.Generate(25));

            var messageFaker = new Faker<Message>()
                .RuleFor(m => m.SenderRoleId, f => f.PickRandom(SenderRoles).Id)
                .RuleFor(m => m.Text, f => f.Lorem.Sentences(f.Random.Number(1, 5)))
                .RuleFor(m => m.CreationDate, f => f.Date.Recent());

            Messages.AddRange(messageFaker.Generate(100));

            var chatFaker = new Faker<Chat>()
                .RuleFor(c => c.IsConfirmedByResponder, f => f.PickRandom(true, false))
                .RuleFor(c => c.IsConfirmedByCreator, f => f.PickRandom(true, false));

            Chats.AddRange(chatFaker.Generate(300));

            var advertNeedsHelpFaker = new Faker<Advert>() //sell
               .RuleFor(a => a.Header, f => f.PickRandom(advertHeadersNeedsHelp))
               .RuleFor(a => a.Location, f => f.PickRandom(Towns))
               .RuleFor(a => a.HelpTypeId, f => 1)
               .RuleFor(a => a.CategoryId, f => f.PickRandom(Categories).Id)
               .RuleFor(a => a.TermsId, f => f.PickRandom(Terms).Id)
               .RuleFor(a => a.CreationDate, f => f.Date.Between(new DateTime(2023, 02, 01), new DateTime(2023, 02, 21)))
               .RuleFor(a => a.ClosureDate, f => f.PickRandom(default, f.Date.Between(new DateTime(2023, 02, 02), new DateTime(2023, 02, 22))));

            var advertCanHelpFaker = new Faker<Advert>() //buy
               .RuleFor(a => a.Header, f => f.PickRandom(advertHeadersCanHelp))
               .RuleFor(a => a.Location, f => f.PickRandom(Towns))
               .RuleFor(a => a.HelpTypeId, f => 2)
               .RuleFor(a => a.CategoryId, f => f.PickRandom(Categories).Id)
               .RuleFor(a => a.TermsId, f => f.PickRandom(Terms).Id)
               .RuleFor(a => a.CreationDate, f => f.Date.Between(new DateTime(2023, 02, 01), new DateTime(2023, 02, 21)))
               .RuleFor(a => a.ClosureDate, f => f.PickRandom(default, f.Date.Between(new DateTime(2023, 02, 02), new DateTime(2023, 02, 22))));

            Adverts.AddRange(advertNeedsHelpFaker.Generate(240));
            Adverts.AddRange(advertCanHelpFaker.Generate(225));

            var hasher = new PasswordHasher<AppUser>();
            var appUserFaker = new Faker<AppUser>()
               .RuleFor(u => u.Name, f => f.Name.FirstName())
               .RuleFor(u => u.Surname, f => f.Name.LastName())
               .RuleFor(u => u.RegistrationDate, f => f.Date.Past())
               .RuleFor(u => u.Info, f => f.PickRandom(personalInfo))
               .RuleFor(u => u.IsBlocked, f => f.PickRandom(true, false))
               .RuleFor(u => u.UserName, (f, p) => f.Internet.UserName(p.Name, p.Surname))
               .RuleFor(u => u.Email, (f, p) => f.Internet.Email(p.Name, p.UserName))
               .RuleFor(u => u.PasswordHash, f => hasher.HashPassword(null, "Admin123."))
               .RuleFor(u => u.PhoneNumber, f => f.PickRandom(phoneNumbers));

            var users = appUserFaker.Generate(300);
            AppUsers.AddRange(users);
        }
    }
}
