FESTS ROUTES

Base URL '/fests'

| HTTP Method  | URI path      | Description               |
|--------------|---------------|---------------------------|
| GET          | '/getAllFests'| All Fests list            |
| GET          | '/details/:id'| Matching ID fest details  |
| POST         | '/newFest'    | Create new fest           |
| PUT          | '/edit/:id'   | Matching ID fest edition  |
| DELETE       | '/delete/:id' | Matching ID fest deletion |


AUTH ROUTES

Base URL '/auth'

| HTTP Met    | URI path       | Description         |
|-------------|----------------|---------------------|
| GET         | '/verify'      | Verify Auth toke    |
| POST        | '/signup'      | Signup user         |
| POST        | '/login'       | Login user          |


USER ROUTES

Base URL '/users'

| HTTP Met    | URI path               | Description         |
|-------------|------------------------|---------------------|
| GET         | '/getAllUsers          | All users list      |
| GET         | '/profile/:id'         | User profile by ID  |
| PUT         | '/edit-profile/:id'    | User edit by ID     |
| DELETE      | '/delete-profile/:id'  | User delete by ID   |

