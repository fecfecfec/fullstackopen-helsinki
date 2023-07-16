```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->>browser: HTTP status 201 / Response: {"message":"note created"}

    Note right of browser: The browser rerenders the note list.
```