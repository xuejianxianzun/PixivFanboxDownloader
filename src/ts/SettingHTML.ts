import { store } from './Store'

export const formHtml = `<form class="settingForm">
      <p class="option" data-no="2">
      <span class="settingNameStyle1" data-xztext="_文件类型"></span>

      <input type="checkbox" name="image" id="fileType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType1" class="has_tip" data-tip="${store.fileType.image.join(
        ','
      )}" data-xztext="_图片"></label>
      
      <input type="checkbox" name="music" id="fileType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType2" class="has_tip" data-tip="${store.fileType.music.join(
        ','
      )}" data-xztext="_音乐"></label> &nbsp;

      <input type="checkbox" name="video" id="fileType3" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType3" class="has_tip" data-tip="${store.fileType.video.join(
        ','
      )}" data-xztext="_视频"></label> &nbsp;
      
      <input type="checkbox" name="compressed" id="fileType4" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType4" class="has_tip" data-tip="${store.fileType.compressed.join(
        ','
      )}" data-xztext="_压缩"></label> &nbsp;
      
      <input type="checkbox" name="ps" id="fileType5" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType5" class="has_tip" data-tip="${store.fileType.ps.join(
        ','
      )}" data-xztext="_PS"></label> &nbsp;

      <input type="checkbox" name="other" id="fileType6" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType6" class="has_tip" data-tip="${store.fileType.other.join(
        ','
      )}" data-xztext="_其他"></label> &nbsp;
      </p>

      <p class="option" data-no="21">
      <span class="settingNameStyle1" data-xztext="_投稿类型"></span>

      <input type="checkbox" name="free" id="postType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType1" data-xztext="_免费投稿"></label> &nbsp;

      <input type="checkbox" name="pay" id="postType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType2" data-xztext="_付费投稿"></label> &nbsp;
      </p>

      <p class="option" data-no="9">
      <span class="settingNameStyle1" data-xztext=_设置价格范围""></span>&nbsp;&nbsp; 
      <input type="checkbox" name="feeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="feeSwitch" data-xztext="_最小值">
      <input type="text" name="fee" class="setinput_style1 w100 blue" value="500"> ¥
      </span>
      </p>
      
      <p class="option" data-no="9">
      <span class="has_tip settingNameStyle1" data-xztip="_设置id范围提示">
      <span data-xztext="_设置id范围"></span>
      &nbsp;&nbsp; <span class="gray1"> ? </span>
      </span>
      <input type="checkbox" name="idRangeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="idRangeSwitch">
      <input type="radio" name="idRange" id="idRange2" class="need_beautify radio" value="2" checked>
      <span class="beautify_radio"></span>
      <label for="idRange2" data-xztext="_小于"></label> &nbsp;
      <input type="radio" name="idRange" id="idRange1" class="need_beautify radio" value="1">
      <span class="beautify_radio"></span>
      <label for="idRange1" data-xztext="_大于"></label> &nbsp;
      <input type="text" name="idRangeInput" class="setinput_style1 w100 blue" value="0">
      </span>
      </p>

      <p class="option" data-no="10">
      <span class="has_tip settingNameStyle1" data-xztip="_设置投稿时间提示">
      <span data-xztext="_设置投稿时间"></span>
      <span class="gray1"> ? </span>
      </span>

      <input type="checkbox" name="postDate" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="postDate">
      <input type="datetime-local" name="postDateStart" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
      &nbsp;-&nbsp;
      <input type="datetime-local" name="postDateEnd" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
      </span>
      </p>

      <p class="option" data-no="19">
      <span class="settingNameStyle1" data-xztext="_保存投稿中的外部链接"></span>&nbsp;&nbsp; 
      <input type="checkbox" name="saveLink" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>
      
      <p class="option" data-no="22">
      <span class="settingNameStyle1" data-xztext="_保存投稿中的封面图片"></span>&nbsp;&nbsp; 
      <input type="checkbox" name="savePostCover" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>

      <p class="option" data-no="20">
      <span class="settingNameStyle1" data-xztext="_保存投稿中的文字"></span>&nbsp;&nbsp; 
      <input type="checkbox" name="saveText" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      </p>

    <p class="option" data-no="13">
      <span class="has_tip settingNameStyle1" data-xztip="_设置文件夹名的提示">
      <span data-xztext="_设置文件名"></span>
      <span class="gray1"> ? </span></span>
      <input type="text" name="userSetName" class="setinput_style1 blue fileNameRule" value=${
        store.defaultFileName
      }>
      &nbsp;
      <select name="fileNameSelect">
        <option value="default">…</option>
        <option value="{user}">{user}</option>
        <option value="{uid}">{uid}</option>
        <option value="{title}">{title}</option>
        <option value="{postid}">{postid}</option>
        <option value="{date}">{date}</option>
        <option value="{task_date}">{task_date}</option>
        <option value="{index}">{index}</option>
        <option value="{name}">{name}</option>
        <option value="{ext}">{ext}</option>
        <option value="{fee}">{fee}</option>
        <option value="{tags}">{tags}</option>
        </select>
      &nbsp;&nbsp;
      <span class="showFileNameTip">？</span>
      </p>
      <p class="tip tipWithBtn" id="tipCreateFolder">
      <span class="left">
      <span data-xztext="_设置文件夹名的提示"></span>
      <strong>{user}/{id}</strong>
      </span>
      <span class="right">
        <button type="button" class="textButton gray1" id="tipCreateFolderBtn" data-xztext="_我知道了">
        </button>
      </span>
    </p>
    <p class="fileNameTip tip">
      <span data-xztext="_设置文件夹名的提示"></span>
      <strong>{user}/{title}/{index}</strong>
      <br>
      <span data-xztext="_命名标记提醒"></span>
      <br>
      <span class="blue">{user}</span>
    <span data-xztext="_命名标记user"></span>
      <br>
      <span class="blue">{uid}</span>
    <span data-xztext="_命名标记uid"></span>
      <br>
      <span class="blue">{title}</span>
    <span data-xztext="_命名标记title"></span>
      <br>
      <span class="blue">{postid}</span>
    <span data-xztext="_命名标记postid"></span>
      <br>
      <span class="blue">{date}</span>
    <span data-xztext="_命名标记date"></span>
      <br>
      <span class="blue">{task_date}</span>
    <span data-xztext="_命名标记taskDate"></span>
      <br>
      <span class="blue">{index}</span>
    <span data-xztext="_命名标记index"></span>
      <br>
      <span class="blue">{name}</span>
    <span data-xztext="_命名标记name"></span>
      <br>
      <span class="blue">{ext}</span>
    <span data-xztext="_命名标记ext"></span>
      <br>
      <span class="blue">{fee}</span>
    <span data-xztext="_命名标记fee"></span>
      <br>
      <span class="blue">{tags}</span>
    <span data-xztext="_命名标记tags"></span>
      <br>
    <span data-xztext="_命名标记提醒"></span>
      </p>

      <p class="option" data-no="31">
      <span class="settingNameStyle1" data-xztext="_日期格式"></span>
      <input type="text" name="dateFormat" class="setinput_style1 blue" style="width:250px;" value="YYYY-MM-DD">
      <button type="button" class="gray1 textButton showDateTip" data-xztext="_提示"></button>
      </p>
      <p class="dateFormatTip tip" style="display:none">
      <span data-xztext="_日期格式提示"></span>
      <br>
      <span class="blue">YYYY</span> <span>2021</span>
      <br>
      <span class="blue">YY</span> <span>21</span>
      <br>
      <span class="blue">MM</span> <span>04</span>
      <br>
      <span class="blue">MMM</span> <span>Apr</span>
      <br>
      <span class="blue">MMMM</span> <span>April</span>
      <br>
      <span class="blue">DD</span> <span>30</span>
      <br>
      <span class="blue">hh</span> <span>06</span>
      <br>
      <span class="blue">mm</span> <span>40</span>
      <br>
      <span class="blue">ss</span> <span>08</span>
      <br>
      </p>
      
      <p class="option" data-no="16">
      <span class="has_tip settingNameStyle1" data-xztip="_线程数字">
      <span data-xztext="_设置下载线程"></span>
      <span class="gray1"> ? </span>
      </span>
      <input type="text" name="downloadThread" class="setinput_style1 blue" value="5">
      </p>

      <p class="option" data-no="17">
      <span class="has_tip settingNameStyle1" data-xztip="_自动下载的提示">
      <span data-xztext="_自动开始下载"></span>
      <span class="gray1"> ? </span>
      </span>
      <input type="checkbox" name="quietDownload" id="setQuietDownload" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>
      
      <slot data-name="crawlBtns" class="centerWrap_btns crawlBtns"></slot>
      <slot data-name="downloadArea"></slot>
      <slot data-name="progressBar"></slot>
</form>`
