import { Config } from './Config'

// 已使用的最大编号为 55
export const formHtml = `<form class="settingForm">
    <p class="option" data-no="2">
    <span class="settingNameStyle1" data-xztext="_文件类型"></span>

    <input type="checkbox" name="image" id="fileType1" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType1" class="has_tip" data-tip="${Config.fileType.image.join()}" data-xztext="_图片"></label>
    
    <input type="checkbox" name="music" id="fileType2" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType2" class="has_tip" data-tip="${Config.fileType.music.join()}" data-xztext="_音乐"></label>

    <input type="checkbox" name="video" id="fileType3" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType3" class="has_tip" data-tip="${Config.fileType.video.join()}" data-xztext="_视频"></label>
    
    <input type="checkbox" name="compressed" id="fileType4" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType4" class="has_tip" data-tip="${Config.fileType.compressed.join()}" data-xztext="_压缩文件"></label>
    
    <input type="checkbox" name="ps" id="fileType5" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType5" class="has_tip" data-tip="${Config.fileType.ps.join()}" data-xztext="_PS文件"></label>

    <input type="checkbox" name="other" id="fileType6" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType6" class="has_tip" data-tip="${Config.fileType.other.join()}" data-xztext="_其他"></label>
    </p>

    <p class="option" data-no="21">
    <span class="settingNameStyle1" data-xztext="_费用类型"></span>

    <input type="checkbox" name="free" id="postType1" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="postType1" data-xztext="_免费投稿"></label>

    <input type="checkbox" name="pay" id="postType2" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="postType2" data-xztext="_付费投稿"></label>
    </p>

    <p class="option" data-no="9">
    <span class="settingNameStyle1" data-xztext="_价格范围"></span>
    <input type="checkbox" name="feeSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="feeSwitch">

    <input type="radio" name="feeRange" id="feeRange1" class="need_beautify radio" value=">=" checked>
    <span class="beautify_radio" tabindex="0"></span>
    <label for="feeRange1">&gt;=</label>

    <input type="radio" name="feeRange" id="feeRange2" class="need_beautify radio" value="=">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="feeRange2">=</label>
    
    <input type="text" name="fee" class="setinput_style1 blue" value="500"> ¥

    </span>
    </p>
    
    <p class="option" data-no="7">
    <span class="has_tip settingNameStyle1" data-xztip="_设置id范围提示">
    <span data-xztext="_id范围"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="idRangeSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="idRangeSwitch">
    <input type="radio" name="idRange" id="idRange2" class="need_beautify radio" value="<" checked>
    <span class="beautify_radio"></span>
    <label for="idRange2" data-xztext="_小于"></label>
    <input type="radio" name="idRange" id="idRange1" class="need_beautify radio" value=">">
    <span class="beautify_radio"></span>
    <label for="idRange1" data-xztext="_大于"></label>
    <input type="text" name="idRangeInput" class="setinput_style1 w100 blue" value="0">
    </span>
    </p>

    <p class="option" data-no="10">
    <span class="has_tip settingNameStyle1" data-xztip="_设置投稿时间提示">
    <span data-xztext="_投稿时间"></span>
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
    <span class="settingNameStyle1" data-xztext="_保存投稿中的外部链接"></span>
    <input type="checkbox" name="saveLink" class="need_beautify checkbox_switch" checked>
    <span class="beautify_switch"></span>
    </p>
    
    <p class="option" data-no="22">
    <span class="settingNameStyle1" data-xztext="_保存投稿中的封面图片"></span>
    <input type="checkbox" name="savePostCover" class="need_beautify checkbox_switch" checked>
    <span class="beautify_switch"></span>
    </p>

    <p class="option" data-no="20">
    <span class="settingNameStyle1" data-xztext="_保存投稿中的文字"></span>
    <input type="checkbox" name="saveText" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    </p>

    <p class="option" data-no="23">
    <span class="has_tip settingNameStyle1" data-xztip="_多条文字用逗号分割">
    <span data-xztext="_投稿标题必须含有文字"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="titleMustTextSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="titleMustTextSwitch">
    <input type="text" name="titleMustText" class="setinput_style1 blue fileNameRule" value="" placeholder="text1,text2,text3">
    </span>
    </p>

    <p class="option" data-no="24">
    <span class="has_tip settingNameStyle1" data-xztip="_多条文字用逗号分割">
    <span data-xztext="_投稿标题不能含有文字"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="titleCannotTextSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="titleCannotTextSwitch">
    <input type="text" name="titleCannotText" class="setinput_style1 blue fileNameRule" value="" placeholder="text1,text2,text3">
    </span>
    </p>

    <p class="option" data-no="54">
    <span class="has_tip settingNameStyle1" data-xztip="_文件指的是附件">
    <span data-xztext="_文件名中必须含有文字"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="fileNameIncludeSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="fileNameIncludeSwitch">
    <span data-xztext="_任一"></span>
    <input type="text" name="fileNameInclude" class="setinput_style1 blue fileNameRule" value="" placeholder="text1,text2,text3">
    </span>
    </p>

    <p class="option" data-no="55">
    <span class="has_tip settingNameStyle1" data-xztip="_文件指的是附件">
    <span data-xztext="_文件名中不能含有文字"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="fileNameExcludeSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="fileNameExcludeSwitch">
    <span data-xztext="_任一"></span>
    <input type="text" name="fileNameExclude" class="setinput_style1 blue fileNameRule" value="" placeholder="text1,text2,text3">
    </span>
    </p>

    <slot data-name="crawlBtns" class="centerWrap_btns crawlBtns"></slot>
    <slot data-name="downloadArea"></slot>
    <slot data-name="progressBar"></slot>

    <p class="option" data-no="13">
      <span class="settingNameStyle1">
      <span data-xztext="_图片的命名规则"></span>
      </span>
      <input type="text" name="userSetName" class="setinput_style1 blue fileNameRule" value="${
        Config.defaultNameRule
      }">
      &nbsp;
      <select name="fileNameSelect" class="beautify_scrollbar">
        <option value="default">…</option>
        <option value="{user}">{user}</option>
        <option value="{create_id}">{create_id}</option>
        <option value="{user_id}">{user_id}</option>
        <option value="{title}">{title}</option>
        <option value="{post_id}">{post_id}</option>
        <option value="{date}">{date}</option>
        <option value="{task_date}">{task_date}</option>
        <option value="{index}">{index}</option>
        <option value="{name}">{name}</option>
        <option value="{ext}">{ext}</option>
        <option value="{fee}">{fee}</option>
        <option value="{tags}">{tags}</option>
        </select>
      &nbsp;
      <slot data-name="saveNamingRule"></slot>
      <button class="showFileNameTip textButton" type="button" data-xztext="_提示"></button>
      </p>
      <p class="tip tipWithBtn" id="tipCreateFolder">
      <span class="left">
      <span data-xztext="_设置文件夹名的提示"></span>
      <strong>${Config.defaultNameRule}</strong>
      </span>
      <span class="right">
        <button type="button" class="textButton gray1" id="tipCreateFolderBtn" data-xztext="_我知道了">
        </button>
      </span>
    </p>
    <p class="fileNameTip tip">
      <span data-xztext="_设置文件夹名的提示"></span>
      <strong>${Config.defaultNameRule}</strong>
      <br>
      <span data-xztext="_命名标记提醒"></span>
      <br>
      <span class="blue">{user}</span>
    <span data-xztext="_命名标记user"></span>
      <br>
      <span class="blue">{create_id}</span>
    <span data-xztext="_命名标记create_id"></span>
      <br>
      <span class="blue">{user_id}</span>
    <span data-xztext="_命名标记uid"></span>
      <br>
      <span class="blue">{title}</span>
    <span data-xztext="_命名标记title"></span>
      <br>
      <span class="blue">{post_id}</span>
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
    </p>
    
    <p class="option" data-no="33">
    <span class="settingNameStyle1" data-xztext="_非图片的命名规则"></span>
    <input type="text" name="nameruleForNonImages" class="setinput_style1 blue nameruleForNonImages" style="width:300px;" value="{user}/{date}-{title}/{name}">
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

    <p class="option" data-no="46">
    <span class="has_tip settingNameStyle1" data-xztip="_在序号前面填充0的说明">
    <span data-xztext="_在序号前面填充0"></span>
    <span class="gray1"> ? </span></span>
    <input type="checkbox" name="zeroPadding" class="need_beautify checkbox_switch" >
    <span class="beautify_switch" tabindex="0"></span>
    <span class="subOptionWrap" data-show="zeroPadding">
    <span data-xztext="_序号总长度"></span>
    <input type="text" name="zeroPaddingLength" class="setinput_style1 blue" value="3" style="width:30px;min-width: 30px;">
    </span>
    </p>

    <p class="option" data-no="17">
    <span class="has_tip settingNameStyle1" data-xztip="_自动下载的提示">
    <span data-xztext="_自动开始下载"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="autoStartDownload" id="setQuietDownload" class="need_beautify checkbox_switch" checked>
    <span class="beautify_switch"></span>
    </p>

    <p class="option" data-no="16">
    <span class="settingNameStyle1"">
    <span data-xztext="_下载线程"></span>
    </span>
    <input type="text" name="downloadThread" class="has_tip setinput_style1 blue" data-xztip="_线程数字" value="3">
    </p>

    <p class="option" data-no="52">
    <span class="settingNameStyle1" data-xztext="_下载完成后显示通知"></span>
    <input type="checkbox" name="showNotificationAfterDownloadComplete" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>
    </p>
      
    <p class="option" data-no="28">
    <span class="has_tip settingNameStyle1" data-xztip="_不下载重复文件的提示">
    <span data-xztext="_不下载重复文件"></span>
    <span class="gray1"> ? </span></span>
    <input type="checkbox" name="deduplication" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>
    <span class="subOptionWrap" data-show="deduplication">
    <button class="textButton gray1" type="button" id="exportDownloadRecord" data-xztext="_导出"></button>
    <button class="textButton gray1" type="button" id="importDownloadRecord" data-xztext="_导入"></button>
    <button class="textButton gray1" type="button" id="clearDownloadRecord" data-xztext="_清除"></button>
    </span>
    </p>

    <p class="option" data-no="18">
    <span class="has_tip settingNameStyle1" data-xztip="_统一网址格式的说明">
    <span data-xztext="_统一网址格式"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="unifiedURL" class="need_beautify checkbox_switch" checked>
    <span class="beautify_switch"></span>
    </p>
      
    <p class="option" data-no="53">
    <span class="settingNameStyle1" data-xztext="_高亮显示关键字"></span>
    <input type="checkbox" name="boldKeywords" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>
    </p>

    <p class="option" data-no="41">
    <span class="settingNameStyle1" data-xztext="_背景图片"> </span>
    <input type="checkbox" name="bgDisplay" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>

    <span class="subOptionWrap" data-show="bgDisplay">

    <button class="textButton gray1" type="button" id="selectBG" data-xztext="_选择文件"></button>
    <button class="textButton gray1" type="button" id="clearBG" data-xztext="_清除"></button>
    
    &nbsp;
    <span data-xztext="_对齐方式"></span>&nbsp;
    <input type="radio" name="bgPositionY" id="bgPosition1" class="need_beautify radio" value="center" checked>
    <span class="beautify_radio" tabindex="0"></span>
    <label for="bgPosition1" data-xztext="_居中"></label>
    <input type="radio" name="bgPositionY" id="bgPosition2" class="need_beautify radio" value="top">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="bgPosition2" data-xztext="_顶部"></label>
    <span data-xztext="_不透明度"></span>&nbsp;
    <input name="bgOpacity" type="range" />
    </span>
    </p>
    
    <p class="option" data-no="32">
    <span class="settingNameStyle1"><span class="key">Language</span></span>
    <input type="radio" name="userSetLang" id="userSetLang1" class="need_beautify radio" value="auto" checked>
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang1" data-xztext="_自动检测"></label>
    <input type="radio" name="userSetLang" id="userSetLang2" class="need_beautify radio" value="zh-cn">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang2">简体中文</label>
    <input type="radio" name="userSetLang" id="userSetLang3" class="need_beautify radio" value="zh-tw">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang3">繁體中文</label>
    <input type="radio" name="userSetLang" id="userSetLang4" class="need_beautify radio" value="ja">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang4">日本語</label>
    <input type="radio" name="userSetLang" id="userSetLang5" class="need_beautify radio" value="en">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang5">English</label>
    <input type="radio" name="userSetLang" id="userSetLang6" class="need_beautify radio" value="ko">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang6">한국어</label>
    </p>

    <p class="option" data-no="37">
    <span class="settingNameStyle1" data-xztext="_管理设置"></span>
    <button class="textButton gray1" type="button" id="exportSettings" data-xztext="_导出设置"></button>
    <button class="textButton gray1" type="button" id="importSettings" data-xztext="_导入设置"></button>
    <button class="textButton gray1" type="button" id="resetSettings" data-xztext="_重置设置"></button>
    </p>
    
    <p class="option" data-no="51">
    <span class="has_tip settingNameStyle1" data-xztip="_显示高级设置说明">
    <span data-xztext="_显示高级设置"></span>
    <span class="gray1"> ? </span></span>
    <input type="checkbox" name="showAdvancedSettings" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>
    </p>

</form>`
