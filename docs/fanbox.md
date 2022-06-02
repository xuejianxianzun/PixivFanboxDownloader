<!-- TOC -->

- [API](#api)
  - [获取任意投稿列表时的通用规则](#获取任意投稿列表时的通用规则)
      - [查询字符串的可用字段](#查询字符串的可用字段)
    - [body 里的字段](#body-里的字段)
      - [items 字段的内容](#items-字段的内容)
  - [获取自己主页的投稿列表](#获取自己主页的投稿列表)
    - [url](#url)
  - [获取“正在赞助”页面的投稿列表](#获取正在赞助页面的投稿列表)
    - [url](#url-1)
  - [获取创作者信息](#获取创作者信息)
    - [url](#url-2)
    - [body 里的字段](#body-里的字段-1)
  - [获取创作者投稿列表](#获取创作者投稿列表)
    - [url](#url-3)
  - [获取创作者某个 tag 的投稿列表](#获取创作者某个-tag-的投稿列表)
    - [url](#url-4)
  - [获取指定投稿](#获取指定投稿)
    - [url](#url-5)
    - [body 里的字段](#body-里的字段-2)
    - [entry 类型](#entry-类型)
    - [body 字段](#body-字段)
      - [body 里 files 的类型](#body-里-files-的类型)
    - [投稿为 article 类型时的 body 字段](#投稿为-article-类型时的-body-字段)
  - [获取创作者商品列表](#获取创作者商品列表)
    - [url](#url-6)
    - [有用数据](#有用数据)
- [页面](#页面)
  - [用户自己的主页](#用户自己的主页)
    - [url 规则](#url-规则)
    - [内容](#内容)
    - [按钮](#按钮)
  - [正在赞助](#正在赞助)
    - [url 规则](#url-规则-1)
    - [内容](#内容-1)
    - [按钮](#按钮-1)
  - [创作者的主页/个人资料页](#创作者的主页个人资料页)
    - [url 规则](#url-规则-2)
    - [内容](#内容-2)
    - [按钮](#按钮-2)
  - [创作者的投稿列表页面](#创作者的投稿列表页面)
    - [url 规则](#url-规则-3)
    - [内容](#内容-3)
    - [资源](#资源)
    - [按钮](#按钮-3)
  - [创作者某个 tag 的投稿列表](#创作者某个-tag-的投稿列表)
    - [url 规则](#url-规则-4)
    - [内容：](#内容-4)
    - [按钮](#按钮-4)
  - [创作者的投稿内容页面](#创作者的投稿内容页面)
    - [url 规则](#url-规则-5)
    - [内容](#内容-5)
    - [资源](#资源-1)
    - [按钮](#按钮-5)
  - [创作者的商店页面](#创作者的商店页面)
    - [url 规则](#url-规则-6)
    - [内容](#内容-6)
    - [资源](#资源-2)
      - [商品封面图](#商品封面图)
    - [按钮](#按钮-6)
    - [注意](#注意)
- [设置选项](#设置选项)
  - [抓取的投稿数量](#抓取的投稿数量)
  - [抓取的文件类型](#抓取的文件类型)
  - [抓取的投稿类型](#抓取的投稿类型)
  - [设置价格区间](#设置价格区间)
  - [设置 id 范围](#设置-id-范围)
  - [设置时间范围](#设置时间范围)
  - [设置命名规则](#设置命名规则)
- [存储结果的数据结构](#存储结果的数据结构)
- [抓取按钮](#抓取按钮)

<!-- /TOC -->

# API

注意：

1. 所有的“投稿列表”里都不含有付费内容。

2. 请求时要携带 cookie，如 

```
fetch('https://fanbox.pixiv.net/api/post.listCreator?userId=457541&limit=10', {
  method: 'get',
  credentials: 'include'
})
.then(res=>{
  return res.json()
})
.then(data=>{
  console.log(data)
  console.log(data.body.nextUrl)
})
```

## 获取任意投稿列表时的通用规则

#### 查询字符串的可用字段

| 字段                 | 说明                   |
| -------------------- | :--------------------- |
| userId               | 用户 id                |
| maxPublishedDatetime | 最大发布时间           |
| maxId                | 最大的投稿 id          |
| limit                | 这次请求获取多少篇投稿 |

- `userId` 在自己主页、“正在赞助”页面，不需要指定 userId。

- `maxPublishedDatetime` 筛选从指定时间开始，**更早期**的投稿。格式如 `"2020-02-14 16:30:37"`，需要用 `encodeURIComponent` 编码。

- `maxId` 筛选从指定 id 开始，**更早期**的投稿。（包含这个 id）

- `limit` 这次请求最多获取多少篇投稿。最大值为 300，超过 300 会产生 HTTP 400 错误。

### body 里的字段

获取到任意投稿列表后，数据在 body 属性里，里面有如下字段：

| 字段    | 值               | 说明                         |
| ------- | :--------------- | :--------------------------- |
| items   | array            | 投稿列表，见下               |
| nextUrl | string 或者 null | 下一次获取投稿列表使用的 URL |

items 是个数组，保存每一篇投稿的信息。获取的投稿顺序总是从最新到最久。（投稿 id 从大到小排列）

如果 items 是空数组，说明没有赞助的画师。

如果有 nextUrl ，则使用 nextUrl 请求接下来的投稿。

#### items 字段的内容

每一篇投稿的数据是 object，包含的字段如下：

| 字段              | 值                                      | 说明                                  |
| ----------------- | :-------------------------------------- | :------------------------------------ |
| id                |                                         | string                                | id |
| title             | string                                  | title                                 |
| coverImageUrl     | string 或者 null                        | 封面图 URL，无则为 null               |
| feeRequired       | number                                  | 需要的赞助金额（日元）                |
| publishedDatetime | string，如  "2020-02-29T19:27:19+09:00" | 发布时间                              |
| updatedDatetime   | string 如 "2020-03-04T21:53:44+09:00"   | 更新时间                              |
| type              | 'file' 或者 'images' 或者 'article'     | 资源的类型                            |
| body              | object 或者 null (下面详细说明)         | 付费的内容，未解锁的话是null          |
| tags              | string[]                                | tags，但是大部分都是空的 []           |
| excerpt           | string 或者 null                        | body 里 text 字段的摘要，未解锁是null |
| isLiked           | boolean                                 | 是否已点赞                            |
| likeCount         | number                                  | 点赞数                                |
| commentCount      | number                                  | 评论数                                |
| restrictedFor     | number 或者 null                        | 限制？不清楚。赞助过的话为 null       |
| user              | object                                  | 作者信息，见下                        |
| status            | "published" 或者还有其他状态，但没遇到  | 该投稿的状态                          |

## 获取自己主页的投稿列表

自己主页显示的投稿列表，有些是赞助的，有些是未赞助的。价值不大。

### url

直接获取最新的 x 篇投稿，官方默认是 10 个：

`https://fanbox.pixiv.net/api/post.listHome?limit=10`

或者使用完整参数：

`https://fanbox.pixiv.net/api/post.listHome?maxPublishedDatetime=2020-03-11%2023%3A04%3A28&maxId=886386&limit=10`

内容在 body 字段里。

## 获取“正在赞助”页面的投稿列表

### url

直接获取最新的 x 篇投稿，官方默认是 10 个：

`https://fanbox.pixiv.net/api/post.listSupporting?limit=10`

或者使用完整参数：

`https://fanbox.pixiv.net/api/post.listSupporting?maxPublishedDatetime=2020-03-01%2018%3A52%3A36&maxId=864129&limit=10`

内容在 body 字段里。

## 获取创作者信息

### url

`https://fanbox.pixiv.net/api/creator.get?userId=457541`

内容在 body 字段里。

### body 里的字段

仅记录部分字段：

| 字段            | 值      | 说明             |
| --------------- | :------ | :--------------- |
| hasAdultContent | boolean | 是否含有成人内容 |
| isSupported     | boolean | 是否赞助过       |
| isStopped       | boolean | 是否已停止赞助   |

## 获取创作者投稿列表

### url

直接获取最新的 x 篇投稿，官方默认是 10 个：

`https://fanbox.pixiv.net/api/post.listCreator?userId=457541&limit=10`

或者使用完整参数：

`https://fanbox.pixiv.net/api/post.listCreator?userId=457541&maxPublishedDatetime=2020-02-14%2016%3A30%3A37&maxId=830218&limit=10`

内容在 body 字段里。

## 获取创作者某个 tag 的投稿列表

### url

`https://fanbox.pixiv.net/api/post.listTagged?tag=%E5%8B%95%E7%94%BB&userId=1082583`

## 获取指定投稿

### url

`https://fanbox.pixiv.net/api/post.info?postId=777807`

内容在 body 字段里。

### body 里的字段

| 字段              | 值                                                             | 说明                                  |
| ----------------- | :------------------------------------------------------------- | :------------------------------------ |
| id                | string                                                         | id                                    |
| title             | string                                                         | title                                 |
| coverImageUrl     | string 或者 null                                               | 封面图 URL，无则为 null               |
| feeRequired       | number                                                         | 需要的赞助金额（日元）                |
| publishedDatetime | string，如  "2020-02-29T19:27:19+09:00"                        | 发布时间                              |
| updatedDatetime   | string 如 "2020-03-04T21:53:44+09:00"                          | 更新时间                              |
| type              | 'file' or 'image' or 'article' or 'video' or 'text' or 'entry' | 投稿的类型                            |
| body              | object 或者 null (下面详细说明)                                | 付费的内容，未解锁的话是null          |
| tags              | string[]                                                       | tags，但是大部分都是空的 []           |
| excerpt           | string 或者 null                                               | body 里 text 字段的摘要，未解锁是null |
| isLiked           | boolean                                                        | 是否已点赞                            |
| likeCount         | number                                                         | 点赞数                                |
| commentCount      | number                                                         | 评论数                                |
| restrictedFor     | number 或者 null                                               | 限制？不清楚。赞助过的话为 null       |
| user              | object                                                         | 作者信息，见下                        |
| status            | "published" 或者还有其他状态，但没遇到                         | 该投稿的状态                          |
| commentList       | object                                                         | 所有评论的详细信息                    |
| nextPost          | object  或者 null                                              | 下一个投稿的简略信息，见下            |
| prevPost          | object  或者 null                                              | 上一个投稿的简略信息，见下            |
| imageForShare     | string                                                         | 分享用的图片的 URL                    |

### entry 类型

`entry` 类型比较特殊，现在在 fanbox 新建投稿，只有除它之外的 5 种类型，没有 entry 类型。可能是以前可以建立的类型，现在不能建立了。

不知道 entry 类型到底是怎么定义的。它的 body 里面有 html 代码，直接把 html 代码渲染到页面上。

需要注意的是，它 html 里的图片 src 不是原图，在图片外面的 a 标签的 href 才是原图。

一份 entry 的数据：

```json
{
  "body": {
      "id": "917",
      "title": "【SAYORI FAN CLUB】NO.002 みんな脱いじゃお",
      "coverImageUrl": "https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/917/cover/4lu0kfigcnwg0owsw0wo0sok.jpeg",
      "feeRequired": 540,
      "publishedDatetime": "2016-12-08T18:00:00+09:00",
      "updatedDatetime": "2018-03-30T13:28:52+09:00",
      "type": "entry",
      "body": {
          "html": "<a href=\"https://downloads.fanbox.cc/images/post/917/52ba2rvpjbk8w880wows84sg.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/52ba2rvpjbk8w880wows84sg.jpeg\" width=\"1200\" height=\"630\"></a>\n<p>こんにちは、さよりです。</p>\n<p>NO.002記事、無事生まれました。今回も2次創作とネコぱら壁紙とネコぱらvol.3開発画像をお届けします。折角のR-18記事だし今回はすべてえっちな壁紙にしたよ〜</p>\n<p>今回の二次創作は艦これの鹿島さんを描きました！鹿島さんエロすぎる・・・特に目つきがたまらないですね・・・描いてるうちにテンション上がてて思わず徹夜しちゃったぜ・・・もちろん原寸ですので、みんなポスターに出力して使いましょう！何枚でも刷れるから、穴をあけたり、肌に落書きしたりしてもいいですぞ。</p><a href=\"https://downloads.fanbox.cc/images/post/917/19f38voxtq74kggwoock8swo.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/19f38voxtq74kggwoock8swo.jpeg\" width=\"1200\" height=\"1694\"></a>\n<p>またこの2次創作コーナーは絵の練習目的も兼ねていますので、普段とは違う塗り方を使ったりしてます。アニメ風とかもやってみたいですね〜</p>\n<p>次はえっちな壁紙です！縦長絵がベースなので、スマホのロック画面に似合うかもしれないですね。</p>\n<a href=\"https://downloads.fanbox.cc/images/post/917/2c6o1fboobk0ss08s4k4ccww.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/2c6o1fboobk0ss08s4k4ccww.jpeg\" width=\"1200\" height=\"750\"></a><a href=\"https://downloads.fanbox.cc/images/post/917/4107ur90fz8k0co4wcwo04w4.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/4107ur90fz8k0co4wcwo04w4.jpeg\" width=\"1200\" height=\"750\"></a><a href=\"https://downloads.fanbox.cc/images/post/917/1o3gbupa4280ww0wco48gkco.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/1o3gbupa4280ww0wco48gkco.jpeg\" width=\"1200\" height=\"750\"></a><p>  </p>\n<p>しかしショコラとバニラばかりですね（汗・・・つ、次はちゃんとほかのキャラの壁紙も用意しますので！</p>\n<p>最後は「ネコぱらvol.3ネコたちのアロマティゼ」の最新情報になります！まずは先週のラフの線画版ですね。</p>\n<a href=\"https://downloads.fanbox.cc/images/post/917/6c2cc72sf4004wkwoco8s4kk.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/6c2cc72sf4004wkwoco8s4kk.jpeg\" width=\"1200\" height=\"1255\"></a><a href=\"https://downloads.fanbox.cc/images/post/917/1izou2h582zo0g4gc0o4g004.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/1izou2h582zo0g4gc0o4g004.jpeg\" width=\"1200\" height=\"1255\"></a><a href=\"https://downloads.fanbox.cc/images/post/917/34obj5rtm7accgo8kso0w8sg.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/34obj5rtm7accgo8kso0w8sg.jpeg\" width=\"1200\" height=\"774\"></a><a href=\"https://downloads.fanbox.cc/images/post/917/1aib2m2wpbb4s804c0skcw8o.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/1aib2m2wpbb4s804c0skcw8o.jpeg\" width=\"1200\" height=\"774\"></a><p>   </p>\n<p>実はこんな感じの差分があります、どんなシチュエーションなのか少し想像できるかな？ドレスは結局我慢できず全部描くことになりました、ゲーム上では映らないのですが、ムービーには使えるということで・・・orz</p>\n<p>さて、さらに新しいラフ2枚をお見せしますよ</p>\n<a href=\"https://downloads.fanbox.cc/images/post/917/6lt3vdj0hsg8w8cckko4wckg.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/6lt3vdj0hsg8w8cckko4wckg.jpeg\" width=\"1200\" height=\"1154\"></a><a href=\"https://downloads.fanbox.cc/images/post/917/5dka8uw68wkckw80wo0c8wo4.jpeg\"><img src=\"https://downloads.fanbox.cc/images/post/917/w/1200/5dka8uw68wkckw80wo0c8wo4.jpeg\" width=\"1200\" height=\"774\"></a><p> </p>\n<p>パソコンとギターはクリスタの3D素材を使ってますね、線を引きなおす必要はありますけども。</p>\n<p>そしてこれまでのラフを見れば、vol.3は音楽に関係する物語ってことは分かりますね。vol.3の正式情報はコミックマーケット91で先行発表する予定ですので、来れる方は「企業ブースN0.3222 NEKO WORKs&amp;KOINEKO SHOP」にぜひお越しください！来れない方は<a href=\"http://nekopara.com/\" target=\"_blank\">HP</a>のチェックをどうぞよろしくお願いします！</p>\n<p>ではでは、また来週〜</p>"
      },
      "tags": [],
      "excerpt": "こんにちは、さよりです。\nNO.002記事、無事生まれました。今回も2次創作とネコぱら壁紙とネコぱらvol.3開発画像をお届けします。折角のR-18記事だし今回はすべてえっちな壁紙にしたよ〜\n今回の二次創作は艦これの鹿島さんを描きました！鹿島さんエロすぎる・・・特に目つきがたまらないですね・・・描いてるうちにテン...",
      "isLiked": false,
      "likeCount": 47,
      "commentCount": 0,
      "restrictedFor": null,
      "isRestricted": false,
      "user": {
          "userId": "104409",
          "name": "さより＠ネコぱらゲーム製作中",
          "iconUrl": "https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/104409/icon/B7aTv2LrwhMYs1d3Eawk07ZR.jpeg"
      },
      "creatorId": "nekoworks",
      "hasAdultContent": true,
      "commentList": {
          "items": [],
          "nextUrl": null
      },
      "nextPost": {
          "id": "918",
          "title": "【SAYORI FAN CLUB】NO.003 双子っていいよね",
          "publishedDatetime": "2016-12-15 18:00:00"
      },
      "prevPost": {
          "id": "916",
          "title": "【SAYORI FAN CLUB】NO.001 PIXIV FANBOX開始しました！",
          "publishedDatetime": "2016-12-01 09:00:00"
      },
      "imageForShare": "https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/917/cover/4lu0kfigcnwg0owsw0wo0sok.jpeg"
  }
}
```

### body 字段

- article 页面，必然有 blocks、imageMap、fileMap、embedMap 四个字段。后三个可能是空对象。
- image 页面，必然有 text 字段、images 字段。images 必然有内容。
- text 页面，只有 text 字段。
- file 页面，必然有 text 字段、files 字段。files 必然有内容。可以有多个内容。
- video 页面，必然有 text 字段、video 字段。video 必然有内容，而且只会有一个 video。
- entry 页面，必然有 html 字段。文章所有内容都保存在 html 文本里。不知道是否有其他字段。

未解锁时（没有赞助或者赞助金额不够），是 `null`。

解锁后是一个 object，可能有以下字段中的一个或多个。示例：

```
{
  // 文字，string
  "text": 'xxxxxxx',
  
  // 文件，array
  "files": [
    {
        "id": "iJlYhPHdYlhoQRAY2c6NKtZG",
        "name": "20200118b",
        "extension": "zip",
        "size": 89088067,
        "url": "https://fanbox.pixiv.net/files/post/777807/iJlYhPHdYlhoQRAY2c6NKtZG.zip"
    }
  ],
  
  // 图片，array
  "images": [
     {
         "id": "gW1I6hnq5VLxTVhMGAPMUWO4",
         "extension": "png",
         "width": 975,
         "height": 1430,
         "originalUrl": "https://fanbox.pixiv.net/images/post/861023/gW1I6hnq5VLxTVhMGAPMUWO4.png",
         "thumbnailUrl": "https://fanbox.pixiv.net/images/post/861023/w/1200/gW1I6hnq5VLxTVhMGAPMUWO4.jpeg"
     },
     {
         "id": "rDA2iArPMxva2ibagyuQuzTR",
         "extension": "png",
         "width": 997,
         "height": 1399,
         "originalUrl": "https://fanbox.pixiv.net/images/post/861023/rDA2iArPMxva2ibagyuQuzTR.png",
         "thumbnailUrl": "https://fanbox.pixiv.net/images/post/861023/w/1200/rDA2iArPMxva2ibagyuQuzTR.jpeg"
     }
  ] ,

  // 当投稿类别是 video 时
  video: {serviceProvider: "youtube", videoId: "tzcXBZr2ADc"}
}
```

#### body 里 files 的类型

fanbox 所允许上传到投稿里的 file，是有类型限制的，全部类型如下：

`.txt,.psd,.pdf,.zip,.jpg,.jpeg,.png,.gif,.wav,.mp3,.flac,.mp4,.mov,.avi,.clip`

简单分类下：

```
{
  image:['jpg','jpeg','png','gif'],
  music:['wav','mp3','flac'],
  video:['mp4','mov','avi'],
  compressed:['zip'],
  ps:['psd','clip'],
  other:['txt','pdf']
}
```

### 投稿为 article 类型时的 body 字段

例如 https://www.pixiv.net/fanbox/creator/49348/post/885969 ，`body` 里 `blocks` 记录投稿里的所有内容（文字和图片等），除了文字之外的其他部分有个资源 id，从资源 map 里获取信息然后加载。

对所有人公开的投稿， `feeRequired` 为 `0`.

```
"blocks": [
    {
        "type": "p",
        "text": "◎あなたのサークル「Allegro Mistic」は、月曜日　西地区“れ”ブロック－04b に配置されました。"
    },
    {
        "type": "image",
        "imageId": "b0OZ6qQ3AQDqd9xCsvt4jMPY"
    }
],
"imageMap": {
    "b0OZ6qQ3AQDqd9xCsvt4jMPY": {
        "id": "b0OZ6qQ3AQDqd9xCsvt4jMPY",
        "extension": "png",
        "width": 300,
        "height": 427,
        "originalUrl": "https://fanbox.pixiv.net/images/post/885969/b0OZ6qQ3AQDqd9xCsvt4jMPY.png",
        "thumbnailUrl": "https://fanbox.pixiv.net/images/post/885969/w/1200/b0OZ6qQ3AQDqd9xCsvt4jMPY.jpeg"
    }
},
"fileMap": {},
"embedMap": {}
```

当出现 `blocks` 时，后面三个资源 map 对象必定都存在。如果资源为空，则是空对象 `{}`，不会是 `null`。

带有视频的免费文章如：

https://www.pixiv.net/fanbox/creator/5240682/post/905816

## 获取创作者商品列表

这是直接从 booth 获取的，不是从 fanbox。

### url

`https://api.booth.pm/pixiv/shops/show.json?pixiv_user_id=2527282&adult=include`

### 有用数据

`body.total_count` 商品总数

`body.items` 所有商品的信息

`body.items[index].primary_image.url` 每个商品的封面图

`body.items[index].name` 每个商品的名称

`body.items[index].market_url` 每个商品的网址

`body.user.nickname` 用户名

`body.user.pixiv_user_id` 用户 id

# 页面

## 用户自己的主页

### url 规则

`https://www.pixiv.net/fanbox`

后面可能带查询字符串，但不能再有其他路径。有其他路径的不是用户主页了。

### 内容

显示的投稿由两部分构成：

1. 已经赞助的画师的投稿
2. 没有赞助但是点了关注按钮的画师的投稿

### 按钮

抓取赞助的所有用户的投稿

## 正在赞助

### url 规则

`https://www.pixiv.net/fanbox/supporting`

### 内容

- 当有赞助的画师时：

显示赞助画师的投稿。

- 当没有赞助的画师时：

跳转回用户自己的主页。

### 按钮

抓取赞助的所有用户的投稿

## 创作者的主页/个人资料页

### url 规则

```
https://www.pixiv.net/fanbox/creator/457541
https://www.pixiv.net/fanbox/creator/6843920
```

最后的 uid 和其在 pixiv 主站的用户 id 一致。

### 内容

1. 个人介绍
2. 投稿列表

### 按钮

抓取该用户的投稿

## 创作者的投稿列表页面

### url 规则

```
https://www.pixiv.net/fanbox/creator/457541/post
```

主页 URL 后面加上 `post` 路径。

### 内容

投稿列表。

1. 不会直接显示付费内容。
2. 不会显示文件下载按钮。
3. 有设置封面图的话，不管是否赞助，都会显示封面图。
4. 没有封面图的话，没赞助时，直接是一个锁。赞助时会显示第一张作为封面图。

### 资源

主要就是封面图，有些投稿没有封面图。虽然封面图看上去可能是裁剪成横图的，但实际上是完整的图片。

### 按钮

抓取该用户的投稿

## 创作者某个 tag 的投稿列表

### url 规则

```
https://www.pixiv.net/fanbox/creator/1082583/tag/%E5%8B%95%E7%94%BB
```

### 内容：

某个 tag 的投稿的列表。

### 按钮

抓取该 tag 的投稿

## 创作者的投稿内容页面

### url 规则

```
https://www.pixiv.net/fanbox/creator/457541/post/777807
```

### 内容

投稿的详细内容

包括付费内容。

### 资源

1. 文件下载按钮（如果有）
2. 图片（如果有）
3. 文本（如果有）

### 按钮

抓取这篇投稿

## 创作者的商店页面

### url 规则

```
https://www.pixiv.net/fanbox/creator/6843920/shop
```

主页 URL 后面加上 `shop` 路径。

### 内容

商品列表，点击会进入 booth 的贩售页面。

### 资源

#### 商品封面图

图片网址如：

`https://booth.pximg.net/51c24798-6d04-43fe-a454-ea981807179c/i/1801292/a0c03ec2-1d23-4571-a79f-77a8b0fd2e1d.jpg`

不知除了 `pximg.net` 是否还有其他 cdn 域名。

### 按钮

抓取商品的封面图

### 注意

商品的 api 和网址不是 fanbox 的，会导致一些选项和命名字段不可用。

# 设置选项

## 抓取的投稿数量

## 抓取的文件类型

<input type="checkbox">图片 <input type="checkbox">视频 <input type="checkbox">压缩包 <input type="checkbox">PS文件 <input type="checkbox"> 其他

## 抓取的投稿类型

付费投稿  免费投稿

## 设置价格区间

只抓取指定价格范围的投稿

## 设置 id 范围

## 设置时间范围

## 设置命名规则

| 字段  | 说明                      |
| ----- | :------------------------ |
| id    | 投稿的 id                 |
| title | 投稿的标题                |
| date  | 投稿的发布时间            |
| fee   | 投稿的价格                |
| name  | 资源原本的文件名          |
| index | 资源的序号                |
| user  | 画师的名字                |
| uid   | 画师的 id                 |
| tags  | 投稿的 tags（如果有）     |
| ext   | 文件的后缀名（extension） |

命名时，对文件名重复的文件添加序号。

# 存储结果的数据结构

以作品为单位存储数据，而不是以文件为单位。

```
[{
  id:number,
  type: 'file' | 'image' | 'article' | 'video' | 'text',
  title:string,
  data:string,
  fee:number,
  user:string,
  uid:string,
  tags:string[],
  resources:[
    // 除文本之外的文件
    {
      type: 'image'|'music'|'video'|'compressed'|'ps'|'other',
      id: string,
      name:string,
      ext:string,
      size:number|null,
      index:number,
      url:string
    },
    // 从投稿文本里提取的文字
    {
      type:'text',
      body:string
    }
  ]
}]
```

# 抓取按钮

- 抓取赞助的所有用户的投稿
- 抓取该用户的投稿
- 抓取该 tag 的投稿
- 抓取这篇投稿
- 抓取商品的封面图
