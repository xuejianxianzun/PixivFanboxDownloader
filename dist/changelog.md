# 1.2.4 2020/10/06

### 加大下载线程数量限制

以前最大只能有 3 个同时下载线程，现在允许最大到 10 个。

# 1.2.3 2020/08/03

### 修复 bug

热心群友（滑稽）报告了一些抓取出错的情况，经过排查，是投稿数据里 body 里的资源数量和资源 map 里的数量不一致导致的。比如 https://sakichisuzu.fanbox.cc/posts/1123079 body 里显示应该有3个图片，但实际上 imageMap 里只有2个图片，导致出错。另外其他画师的投稿还有 file 对不上的类似情况。现在做了判断，进行修复。

# 1.2.2 2020/07/29

### 处理了投稿类型为 entry 的情况

[issues 3](https://github.com/xuejianxianzun/PixivFanboxDownloader/issues/3) 报告早期一些作品抓取出错，一看确实，早期有种投稿类型是“entry”，它的所有内容都保存在一整段 html 里，存放在 `body.html` 字段。现在对这个问题进行了修复。

# 1.2.0 2020/07/24

### 添加了保存文章正文的选项

保存投稿中的文字

如果启用这个选项，那么文章的正文会和文章里的 url 保存到同一个 txt 文件里下载。

# 1.1.2 2020/07/03

### 优化了文件类型的分类

psd 和 clip 都归属于“源文件”了。

鼠标放到文件类型上，会显示包含的后缀名。

### 修复了一些 bug

#### 同名文件下载只下载了一个的问题

如果一篇文章里多个文件的原文件名相同，如 https://countryside.fanbox.cc/posts/968477 有一个 zip 和一个 pdf 的文件名都是“shokumusu_c94_r18”，导致了程序内部出现错误，只下载了同名的第一个文件。现在进行修复。

#### 文本里的链接抓取不全的问题

同一个段落里有多个链接的，如 https://kirastar3626.fanbox.cc/posts/1116141 ，之前只抓取到第一个。现在做出优化，可以都抓取到了。

# 1.1.1 2020/05/25

### 找到了 Twitter 的前缀

`https://twitter.com/i/web/status/` 加上推文的 id 

# 1.1.0 2020/04/28

### 适应 url 改版

fanbox 域名从 `www.pixiv.net/fanbox` 迁移到了独立域名 `fanbox.cc`，对此进行了适配。

#### 已知问题

1. 配置不能充分共享。

因为 fanbox.cc 的域名前缀可能是用户名，例如 `user1.fanbox.cc`  和 `user2.fanbox.cc` 就是跨域的了，所以如果在 user1 里修改了设置条件，但在其他用户页面里是读取不到的，读取不到就会使用默认设置。所以这点比较坑。还好一般人不会赞助太多的用户，每个用户自己改一遍设置吧。

2. 设置 Origin 时发生错误

有时候扩展会发生错误：

`Unchecked runtime.lastError: Invalid header specification '{"name":"Origin"}'.`

background 会对没有 Origin 的请求设置 Origin，fanbox 本身的一些请求可能会导致抛出这个错误，但扩展发起的请求不会出现这个错误。

这个错误目前似乎对使用没有影响，也不会导致 fanbox 自身的请求失败，先不管了。

#### 待观察

去掉了 manifest.json 里的 `"*://*.pximg.net/*"`，因为 fanbox.cc 里用户的文件似乎都是 `downloads.fanbox.cc`的，没有再使用 `pximg.net` 了，所以去掉。

话说 fanbox 下载器是把 url 交给浏览器下载的，所以实际上也不用在意文件的 url 了。

#### 一点技术细节

从 www.fanbox.cc 或者以用户名为前缀的 any.fanbox.cc 去请求 api.fanbox.cc 的 url，请求失败。

扩展在前台脚本里发送出的 fetch 请求，没有 `referer` 也没有 `origin`。这好像有点奇怪。

我在 background 里设置 `requestHeaders`，把 `referer` 和 `origin` 都设置成 www.fanbox.cc，控制台看着是添加上了，但是实际上请求仍然失败。

搜索了好久，原来 chrome 79 开始，扩展修改的请求头如果不符合标准（我理解的是像 `origin` 这样本来不应该修改的请求头），会先向服务器发起 CORS 预检查， response headers  里有 `access-control-allow-headers` 和 `access-control-allow-origin`，可能浏览器是根据这些信息来判断的，如果我们的跨域请求被拒绝了，那么我们的这个请求，包括自己修改的 header 就不会被发出去。

如果要欺瞒 CORS 检查，需要添加 `extraHeaders` 才行。这个标记以前不知道。

相关文档：

https://developer.chrome.com/extensions/webRequest

搜索 extraHeaders 查看这部分说明。

##### 更坑的地方

当扩展添加 `referer` 和 `origin`  请求头的时候，实际上使用的是 `details.initiator`。这是因为这两个请求头都必须和发起请求的页面的网址前缀相同：

如果发起请求的页面的网址前缀是 www ，也就是 `www.fanbox.cc` 开头的，那么 `referer` 和 `origin` 设置成 `https://www.fanbox.cc` 就行。

但是如果发起页的网址前缀不是 www（如果用户自定义了用户名，那么 www 就会变成用户名，如 `https://kyomoneko.fanbox.cc`），这时候服务器可能检测了一些条件，要求 `referer` 和 `origin` 必须符合这个用户名，也就是需要 `https://kyomoneko.fanbox.cc` 才行。此时如果设置成  `https://www.fanbox.cc` 那么请求不会报错，但也不会返回任何数据。

# 修改 logo 2020/04/20

今天看到谷歌商店拒绝了这个扩展，说是虚假宣传之类的。我去掉了 logo 上的文字，再试试。

结果：仍然没有通过审核。

# 1.0.2 2020/04/24

### 优化提取文本中的链接

1. 解决了不能抓取 mega 网盘链接的问题。

之前的正则表达式没有涵盖网址里的一些特殊字符，导致匹配出错，现在修复。

目前的正则是：

```/http[s]*:\/\/[\w=\?\.\/&\-\#\!\%]+/g```

2. 之前在段落包含 links 字段时没有保存里面的链接，现在加以保存。

### 去除了代码中多余的导入

# 1.0.1 2020/04/17

### 修复已知问题

某些 Article 类型的投稿里，图片在文章里的顺序，与图片在附件数据里的顺序不一致。之前是按照附件数据来存储数据，导致顺序错误，应该以文章里的顺序为准。现在修复了这个问题。

示例投稿：
https://www.pixiv.net/fanbox/creator/236592/post/954377

# 1.0.0 2020/04/15

正式发布

### 已知问题

如果因为某些异常导致下载卡住，那么暂停、再开始下载，没有反应

下载的问题，大批量下载可能到最后一两个卡住
