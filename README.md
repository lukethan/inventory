# Keg South Inventory Webapp Frontend
"inventory" is a React application hosted on GitHub Pages that is served by a Flask backend via RESTful APIs.

## Relevant Links
  * [Public-Facing Website](https://lukethan.github.io/inventory/)

  * [Back-End Repository](https://github.com/lukethan/inventory-backend) (Visit for detailed API documentation)

### Client Needs:
  * Inventory management system that can be accessed via the internet, and updated by a number of different employees

  * Simple user interface that allows for increasing and decreasing existing inventory, adding new items and deleting items from the page

  * Pictures to represent inventory items

### Application Breakdown
  * In order to meet the client's needs, I utilized React to create a responsive and reactive frontend to display inventory information that is served
    via my Flask backend. I chose to create a card component to represent products, so that each product is listed separately and has its own increment,
    decrement and delete functions to simplify interactions for users. I implemented useEffects to dynamically update a client's page when new products are
    added or deleted, without the need for a manual refresh. Each action triggers an API call to update the database, ensuring that changes are saved
    in real time. I also included the feature of adding custom photos to each product component, using an API to store the file in my backend and then
    generate a URL to serve the frontend. My next step is implementing SocketIO integration to ensure that multiple users see product changes in real time.
    User authentication isn't currently included, as the client wants easy access to the website without a login.


