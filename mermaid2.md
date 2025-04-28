```erDiagram
    USER {
        ObjectId _id PK
        String name
        String email (unique)
        String password (hashed)
        Enum role "host/player"
        Object stats "wins, losses, points, achievements"
        Number virtualMoney
        Date createdAt
    }

    TOURNAMENT {
        ObjectId _id PK
        String name
        ObjectId hostId FK "User"
        String uniqueCode (unique)
        Date startDate
        Date endDate
        Enum status "upcoming/live/completed"
        String rules
        Date createdAt
    }

    PARTICIPATION {
        ObjectId _id PK
        ObjectId tournamentId FK "Tournament"
        ObjectId userId FK "User"
        Enum role "host/player"
        Enum status "pending/registered"
        Array sports "Array of sportIds"
    }

    SPORT {
        ObjectId _id PK
        ObjectId tournamentId FK "Tournament"
        String name
        Enum type "individual/team"
        Number maxPlayers
        Array participantIds "UserIds"
    }

    MATCH {
        ObjectId _id PK
        ObjectId sportId FK "Sport"
        ObjectId tournamentId FK "Tournament"
        ObjectId player1 FK "User"
        ObjectId player2 FK "User"
        ObjectId winner FK "User"
        String score
        Enum status "pending/completed"
    }

    AUCTION {
        ObjectId _id PK
        ObjectId tournamentId FK "Tournament"
        ObjectId sportId FK "Sport"
        Enum status "open/closed"
    }

    TEAM {
        ObjectId _id PK
        ObjectId auctionId FK "Auction"
        String teamName
        ObjectId captainId FK "User"
        Number budget
        Array playerIds "UserIds"
        Array bids "Embedded bid objects"
    }

    BID {
        ObjectId _id PK
        ObjectId auctionId FK "Auction"
        ObjectId playerId FK "User"
        ObjectId bidderId FK "User"
        Number amount
        Enum status "active/won"
    }

    USER ||--o{ PARTICIPATION : "participates"
    TOURNAMENT ||--o{ PARTICIPATION : "has"
    TOURNAMENT ||--o{ SPORT : "contains"
    SPORT ||--o{ MATCH : "has"
    USER ||--o{ MATCH : "plays"
    TOURNAMENT ||--o{ AUCTION : "organizes"
    AUCTION ||--o{ TEAM : "creates"
    TEAM ||--o{ BID : "places"
    USER ||--o{ BID : "bids"
