```mermaid
flowchart TD
    A["LOGIN
    - Remember?
    - 3rd-Party Login?"];
    
    B["Home
    -Active Convos
    -Start New
    -Uread/Recent first"];
    
    C["FRIENDS
    -Current Friends
    -Friend Requests"];
    
    D["Convo
    -Settings
    -Participants"];
    
    E["User Profile
    -Edit"];
    
    F["Friend Profile
    -Block
    -Unfriend
    -Request"];
    
    G["Settings
    -Notifications
    -Allow Group Chat"];

    H["Participants
    -Add/Remove
    -View Profile"];



    A <-->|Success| B;
    B <--> D;
    B <--> C;
    B <--> E;
    B <--> G;
    C <--> F;
    D <--> H;
    H <--> F;
```
