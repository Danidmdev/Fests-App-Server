FESTS ROUTES

Base URL '/fests'

| HTTP Method  | URI path      | Description               |
|--------------|---------------|---------------------------|
| GET          | '/getAllFests'| All Fests list            |
| POST         | '/newFest'    | Create new fest           |
| GET          | '/:id'        | Matching ID fest details  |
| PUT          | '/:id/edit'   | Matching ID fest edition  |
| DELETE       | '/:id/delete' | Matching ID fest deletion |


AUTH ROUTES

Base URL '/auth'

| HTTP Met    | URI path      | Description         |
|-------------|---------------|---------------------|
| POST        | '/signup'     | Signup user         |
| POST        | '/login'      | Login user          |
| GET         | '/verify'     | Verify Auth toke    |
| PUT         | '/:id/edit'   | User edit by ID     |
| DELETE      | '/:id/delete' | User delete by ID   |

