# DB設計

## テーブルの種類
* usersテーブル
* groupsテーブル
* messagesテーブル
* group_usersテーブル

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|mail|string|null: false, unique: true|

### Association
- has_many :groups, through: group_users
- has_many :messages
- has_many :group_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|

### Association
- has_many :users, through: group_users
- has_many :group_users
- has_many :messages
- validates :name, presence: true

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## group_userテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
