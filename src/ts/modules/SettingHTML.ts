import { lang } from './Lang'
import { store } from './Store'

const formHtml = `<form class="settingForm">
      <p class="option" data-no="2">
      <span class="settingNameStyle1">${lang.transl('_文件类型')}</span>

      <input type="checkbox" name="image" id="fileType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType1" title="${store.fileType.image.join(
        ','
      )}"> ${lang.transl('_图片')}&nbsp;</label>
      
      <input type="checkbox" name="music" id="fileType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType2" title="${store.fileType.music.join(
        ','
      )}"> ${lang.transl('_音乐')}&nbsp;</label>

      <input type="checkbox" name="video" id="fileType3" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType3" title="${store.fileType.video.join(
        ','
      )}"> ${lang.transl('_视频')}&nbsp;</label>
      
      <input type="checkbox" name="compressed" id="fileType4" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType4" title="${store.fileType.compressed.join(
        ','
      )}"> ${lang.transl('_压缩文件')}&nbsp;</label>
      
      <input type="checkbox" name="ps" id="fileType5" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType5" title="${store.fileType.ps.join(
        ','
      )}"> ${lang.transl('_PS文件')}&nbsp;</label>

      <input type="checkbox" name="other" id="fileType6" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType6" title="${store.fileType.other.join(
        ','
      )}"> ${lang.transl('_其他')}&nbsp;</label>
      </p>

      <p class="option" data-no="21">
      <span class="settingNameStyle1">${lang.transl('_投稿类型')}</span>

      <input type="checkbox" name="free" id="postType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType1"> ${lang.transl('_免费投稿')}&nbsp;</label>

      <input type="checkbox" name="pay" id="postType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType2"> ${lang.transl('_付费投稿')}&nbsp;</label>
      </p>

      
      <p class="option" data-no="9">
      <span class="settingNameStyle1">${lang.transl(
        '_设置价格范围'
      )}&nbsp;&nbsp; 
      </span>
      <input type="checkbox" name="feeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="feeSwitch">
      ${lang.transl('_最小值')}
      <input type="text" name="fee" class="setinput_style1 w100 blue" value="500"> ¥
      </span>
      </p>
      
      <p class="option" data-no="9">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_设置id范围提示'
      )}">${lang.transl('_设置id范围')}&nbsp;&nbsp; 
      <span class="gray1"> ? </span></span>
      <input type="checkbox" name="idRangeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="idRangeSwitch">
      <input type="radio" name="idRange" id="idRange2" class="need_beautify radio" value="2" checked>
      <span class="beautify_radio"></span>
      <label for="idRange2">  ${lang.transl('_小于')}&nbsp; </label>
      <input type="radio" name="idRange" id="idRange1" class="need_beautify radio" value="1">
      <span class="beautify_radio"></span>
      <label for="idRange1">  ${lang.transl('_大于')}&nbsp; </label>
      <input type="text" name="idRangeInput" class="setinput_style1 w100 blue" value="0">
      </span>
      </p>

      <p class="option" data-no="10">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_设置投稿时间提示'
      )}">${lang.transl('_设置投稿时间')} <span class="gray1"> ? </span></span>

      <input type="checkbox" name="postDate" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="postDate">
      <input type="radio" name="postRange" id="postRange2" class="need_beautify radio" value="-1" checked>
      <span class="beautify_radio"></span>
      <label for="postRange2">  ${lang.transl('_早于')}&nbsp; </label>
      <input type="radio" name="postRange" id="postRange1" class="need_beautify radio" value="1">
      <span class="beautify_radio"></span>
      <label for="postRange1">  ${lang.transl('_晚于')}&nbsp; </label>
      <input type="datetime-local" name="postDateInput" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
      </span>
      </p>

      <p class="option" data-no="19">
      <span class="settingNameStyle1">${lang.transl(
        '_保存投稿中的外部链接'
      )}&nbsp;&nbsp; 
      </span>
      <input type="checkbox" name="saveLink" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>
      
      <p class="option" data-no="20">
      <span class="settingNameStyle1">${lang.transl(
        '_保存投稿中的文字'
      )}&nbsp;&nbsp; 
      </span>
      <input type="checkbox" name="saveText" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      </p>

    <p class="option" data-no="13">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_设置文件夹名的提示'
      )}">${lang.transl('_设置文件名')}<span class="gray1"> ? </span></span>
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
        <option value="{index}">{index}</option>
        <option value="{name}">{name}</option>
        <option value="{ext}">{ext}</option>
        <option value="{fee}">{fee}</option>
        <option value="{tags}">{tags}</option>
        </select>
      &nbsp;&nbsp;
      <span class="showFileNameTip">？</span>
      </p>
      <p class="fileNameTip tip">
      <strong>${lang
        .transl('_设置文件夹名的提示')
        .replace('<br>', '. ')}</strong>
      <br>
      <span class="blue">{user}</span>
      ${lang.transl('_命名标记user')}
      <br>
      <span class="blue">{uid}</span>
      ${lang.transl('_命名标记uid')}
      <br>
      <span class="blue">{title}</span>
      ${lang.transl('_命名标记title')}
      <br>
      <span class="blue">{postid}</span>
      ${lang.transl('_命名标记postid')}
      <br>
      <span class="blue">{date}</span>
      ${lang.transl('_命名标记date')}
      <br>
      <span class="blue">{index}</span>
      ${lang.transl('_命名标记index')}
      <br>
      <span class="blue">{name}</span>
      ${lang.transl('_命名标记name')}
      <br>
      <span class="blue">{ext}</span>
      ${lang.transl('_命名标记ext')}
      <br>
      <span class="blue">{fee}</span>
      ${lang.transl('_命名标记fee')}
      <br>
      <span class="blue">{tags}</span>
      ${lang.transl('_命名标记tags')}
      <br>
      ${lang.transl('_命名标记提醒')}
      </p>
      
      <p class="option" data-no="16">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_线程数字'
      )}">${lang.transl('_设置下载线程')}<span class="gray1"> ? </span></span>
      <input type="text" name="downloadThread" class="setinput_style1 blue" value="5">
      </p>

      <p class="option" data-no="17">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_自动下载的提示'
      )}">${lang.transl('_自动开始下载')}<span class="gray1"> ? </span></span>
      <input type="checkbox" name="quietDownload" id="setQuietDownload" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>
      
      <slot data-name="crawlBtns" class="centerWrap_btns crawlBtns"></slot>
      <slot data-name="downloadArea"></slot>
      <slot data-name="progressBar"></slot>
</form>`

export default formHtml
