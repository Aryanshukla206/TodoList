```mermaid
erDiagram
    USER {
        ObjectId _id
        String name
        String email UNIQUE
        String password
        Enum role "host/player"
        Array tournamentRoles "tournamentId, role (host/player)"
        Object stats "wins, losses, points, achievements"
        Number virtualMoney
        Date createdAt
    }

    TOURNAMENT {
        ObjectId _id
        String name
        ObjectId hostId "ref: USER"
        String uniqueCode UNIQUE
        Array sports "ref: SPORT"
        Array participants "userId, status (pending/registered)"
        Date startDate
        Date endDate
        Enum status "upcoming/live/completed"
        String rules
        Date createdAt
    }

    SPORT {
        ObjectId _id
        ObjectId tournamentId "ref: TOURNAMENT"
        String name
        Enum type "individual/team"
        Number maxPlayers
        Array participants "ref: USER"
        Array matches "ref: MATCH"
    }

    MATCH {
        ObjectId _id
        ObjectId sportId "ref: SPORT"
        ObjectId tournamentId "ref: TOURNAMENT"
        ObjectId player1 "ref: USER"
        ObjectId player2 "ref: USER"
        ObjectId winner "ref: USER"
        String score
        Enum status "pending/completed"
        Date matchDate
    }

    AUCTION {
        ObjectId _id
        ObjectId tournamentId "ref: TOURNAMENT"
        ObjectId sportId "ref: SPORT"
        Enum status "open/closed"
        Array teams "ref: TEAM"
        Date createdAt
    }

    TEAM {
        ObjectId _id
        ObjectId auctionId "ref: AUCTION"
        String name
        ObjectId captain "ref: USER"
        Array players "ref: USER"
        Number budget
        Array bids "ref: BID"
    }

    BID {
        ObjectId _id
        ObjectId auctionId "ref: AUCTION"
        ObjectId teamId "ref: TEAM"
        ObjectId playerId "ref: USER"
        ObjectId bidderId "ref: USER"
        Number amount
        Enum status "active/won/expired"
        Date createdAt
    }

    USER ||--o{ TOURNAMENT : hosts
    USER ||--o{ TOURNAMENT : joins
    TOURNAMENT ||--o{ SPORT : contains
    SPORT ||--o{ MATCH : schedules
    USER ||--o{ MATCH : plays_in
    USER ||--o{ BID : bids_for
    TOURNAMENT ||--o{ AUCTION : organizes
    AUCTION ||--o{ TEAM : includes
    TEAM ||--o{ BID : makes
    USER ||--o{ TEAM : joins
```
