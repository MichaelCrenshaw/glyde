```mermaid
erDiagram
    User {
        uuid id
        string username
        string email
        string passwordHash
        string passwordSalt
    }
    UserSettings {
        blob profilePicture
        bool pushNotifications "true"
    }
    FriendStatus {
        uuid id
        uuid id
        string status
    }
    Message {
        uuid senderId
        uuid channelId
        string content
        array[blob] attachments
    }
    Channel {
        uuid channelId
        string name
        string type
        blob icon
        array[uuid] members
    }
    UserChannelSettings {
        uuid userId
        uuid channelId
        bool muted
        bool pinned
    }
    User ||..|| UserSettings : has
    User ||--o{ FriendStatus : has
    User ||--o{ Message : sends
    User }|--o{ Channel : in
    Channel }|--o{ Message : has
    User ||--o{ UserChannelSettings : has
    UserChannelSettings }o--o{ Channel : has    
```

# PSQL Table Declaration

```psql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL
);

CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    profile_picture BYTEA,
    push_notifications BOOLEAN NOT NULL
);

CREATE TABLE friend_status (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    friend_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, friend_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    content VARCHAR(255) NOT NULL,
    attachments BYTEA[]
);

CREATE TABLE channels (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    icon BYTEA,
    members UUID[] NOT NULL
);

CREATE TABLE user_channel_settings (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    muted BOOLEAN NOT NULL DEFAULT FALSE,
    pinned BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id, channel_id)
);

CREATE TABLE channel_messages (
    channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    PRIMARY KEY (channel_id, message_id)
);
```
