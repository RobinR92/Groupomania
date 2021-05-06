# Data dictionary

## Users (`users`)

|Field|Type|Specificities|Description|
|-|-|-|-|
|id|INT(11)|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|The identifier of the user|
|email|VARCHAR(180)|NOT NULL, UNIQUE|The email associated to the user|
|username|VARCHAR(60)|NOT NULL, UNIQUE|The username associated to the user|
|roles|JSON|NOT NULL|All roles assigned to the user|
|password|VARCHAR(255)|NOT NULL|The password hash used to login to the account|
|createdAt|DATETIME|NOT NULL|The creation date of the user account|
|updatedAt|DATETIME|NOT NULL|The update date of the user account|

## Posts (`posts`)

|Field|Type|Specificities|Description|
|-|-|-|-|
|id|INT(11)|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|The identifier of the post|
|content|TEXT|NOT NULL|The text message of the post|
|image|VARCHAR(255)|NULL|The image associated with the post message|
|ownerId|INT(11)|FOREIGN KEY, NOT NULL, UNSIGNED|User id attached to the post|
|createdAt|DATETIME|NOT NULL|The creation date of the post|
|updatedAt|DATETIME|NOT NULL|The update date of the post|

## Comments (`comments`)

|Field|Type|Specificities|Description|
|-|-|-|-|
|id|INT(11)|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|The identifier of the comment|
|message|TEXT|NOT NULL|The text message of the comment|
|ownerId|INT(11)|FOREIGN KEY, NOT NULL, UNSIGNED|User id attached to the comment|
|postId|INT(11)|FOREIGN KEY, NOT NULL, UNSIGNED|Post id attached to the comment|
|createdAt|DATETIME|NOT NULL|The creation date of the comment|
|updatedAt|DATETIME|NOT NULL|The update date of the comment|
