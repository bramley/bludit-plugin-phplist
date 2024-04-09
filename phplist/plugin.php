<?php

class pluginPhplist extends Plugin
{
    public function init()
    {
        $this->dbFields = [
            'label' => 'Subscribe',
            'text' => '<p>Sign-up to our newsletter</p>',
            'phplist_url' => '',
            'subscribe_page' => 1,
        ];
    }

    public function form()
    {
        global $L;

        $html = '';
        $html .= '<style type="text/css">
            .plugin-form .phplist-form label {margin-top: 0 !important; }
            .phplist-form .short-input { max-width: 200px };
            </style>';
        $html .= '<div class="tab-content phplist-form">';

        $html .= Bootstrap::formInputText([
              'name' => 'label',
              'label' => $L->get('Sidebar area label'),
              'value' => $this->getValue('label'),
              'tip' => $L->get('The label of the sidebar area.'),
              'class' => 'short-input',
              ]);
        $html .= Bootstrap::formTextarea([
              'name' => 'text',
              'label' => $L->get('Sidebar area'),
              'value' => $this->getValue('text'),
              'tip' => $L->get('Content in HTML for the sidebar'),
              ]);
        $html .= Bootstrap::formInputText([
              'name' => 'phplist_url',
              'label' => $L->get('URL of phpList'),
              'value' => $this->getValue('phplist_url'),
              'tip' => $L->get('e.g. https://mysite.com/lists'),
              'class' => 'short-input',
              ]);
        $html .= Bootstrap::formInputText([
              'name' => ' subscribe_page',
              'label' => $L->get('Subscribe page ID'),
              'value' => $this->getValue('subscribe_page'),
              'class' => 'short-input',
              ]);
        $html .= '</div>';

        return $html;
    }

    public function siteHead()
    {
        $jquery = sprintf('%s/js/%s', $this->getValue('phplist_url'), 'jquery-3.6.0.min.js');
        $subscribe = sprintf('%s/js/%s', $this->getValue('phplist_url'), 'phplist-subscribe-0.3.min.js');
        $format = <<<'END'
<script type="text/javascript" src="%s"></script>
<script type="text/javascript" src="%s"></script>
END;
        $head = sprintf($format, $jquery, $subscribe);

        return $head;
    }

    public function siteSidebar()
    {
        $url = sprintf('%s/?p=subscribe&amp;id=%d', $this->getValue('phplist_url'), $this->getValue('subscribe_page'));
        $format = <<<'END'
<div class="plugin plugin-phplist">
    <h2 class="plugin-label">%s</h2>
    <div class="plugin-content">
        <div>%s</div>
    <div id="phplistsubscriberesult"></div>
    <form action="%s" method="post" id="phplistsubscribeform">
        <input type="text" name="email" value="" id="emailaddress"/>
        <input type="submit" id="phplistsubscribe" class="submit" value="Subscribe"/>
    </form>
    </div>
</div>
END;
        $html = sprintf($format, $this->getValue('label'), $this->getValue('text', false), $url);

        return $html;
    }
}
