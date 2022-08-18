
# Lattice NodeJs Assignment




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`port`

`s3AccessId`
`s3SecretKey`
`s3Region`
`s3Bucket`

`mySqlHost`
`mySqlUser`
`mySqlPassword`
`mySqlDatabase`

## MySql Table Structures

#### Hospital Table


![hospital](https://user-images.githubusercontent.com/103020057/185427891-55c55a64-c574-4b7d-a173-c44c7e4c0edd.png)

#### Psychiatrist Table

![psychiatrists](https://user-images.githubusercontent.com/103020057/185428963-cfbf175a-37d0-44bf-bc5e-346f7bf9b5ca.png)

#### Patient Table

![patients](https://user-images.githubusercontent.com/103020057/185429010-bc457db7-fff3-40ab-a3e7-3181ca758030.png)


## API Reference

### Get particular Hospital Details

###  GET /hospitals

content Type :- form-data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `hospital_id` | `string` | **Required**.Id of hospital to fetch |


### Register Patient


###  POST /paitents

content Type :- form-data
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.  |
|`address`|`string`| **Required**.|
|`phone`|`string`|Optional|
|`email`|`string`|**Required**.|
|`password`| `string`|**Required**|
|`photo`|`string`|**Required**|
|`psychiatrist_id`|`string`|**Required**. Id of psychiatrist registering the user|



### Register Psychiatrist


 #### POST /psychiatrists

content Type :- form-data
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.  |
|`phone`|`string`|**Required**.|
|`email`|`string`|**Required**.|
|`password`| `string`|**Required**|
|`photo`|`string`|**Required**|
|`hospital_id`|`string`|**Required**. Id of hospital in which psychiatrist working|


### Register Hospital

####  POST /hospitals

content Type :- form-data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.Name of hospital to rigster |



## Dependencies Used

`express`
`mysql2`
`dotenv`
`@aws-sdk/client-s3`
`multer`


## Additional Info

- MySql database backup is available in database folder
- Postman collection is available in PostMan collection folder & also available on this link https://www.postman.com/collections/f79d9828529a054e8dbd
