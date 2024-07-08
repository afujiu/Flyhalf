# TableData
## Task
| key | name | type | detail |
|:--|:--|:--|:--|
| id | ユニークキー | number | ユニークキー |
| beforeId | 並び順調整ID | number | ユニークキー |
| deteleDate | 削除日時 | string datetime | YYYY-MM-DDTHH:MM:SSZ 削除の場合は空白 |
| title | タイトル | string | 1行タイトル |
| version | スプリント | number | スプリントID |
| contents | 説明 | richText | [{user:string,date:datetime,text:string}] |
| type | タスク種類 | string | 'goal','pbl','sbl','task' |
| status | ステータス | string | 'todo','progress','complete' |
| user | 担当者 | string | 担当キー |
| parentId | 親ID | number | id |
| point | ポイント | number | 1,2,3,5,8,13,21 |
| priority | 優先度 | number | 高いほど重要 |
| startPlanDate | 開始予定日時 | string datetime | YYYY-MM-DDTHH:MM:SSZ |
| endPlanDate | 予定終了日時 | string datetime | YYYY-MM-DDTHH:MM:SSZ |
| histories | 履歴 | array{object} | [{user:string,date:datetime,text:string}] |


## Version
| key | name | type | detail |
|:--|:--|:--|:--|
| id | ユニークキー | number | ユニークキー |
| beforeId | 並び順調整ID | number | ユニークキー |
| deteleDate | 削除日時 | string datetime | YYYY-MM-DDTHH:MM:SSZ 削除の場合は空白 |
| title | タイトル | string | 1行タイトル |
| contents | 説明 | richText | [{user:string,date:datetime,text:string}] |
| startDate | 開始日 | string datetime | YYYY-MM-DDTHH:MM:SSZ|
| endDate | 終了日 | string datetime | YYYY-MM-DDTHH:MM:SSZ|
| kpt | KPT | array{object} | [{user:string,date:datetime,type:string[keep,problem,try],text:string}] |
