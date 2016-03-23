export var wizard = {
    "app_name": "",
    "app_model": "",
    "layout": "",
    "steps": []
};
export var step = {
    "title": "",
    "description": "",
    "column": "12",
    "layout": "box",
    "type": "step",
    "info": {},
    "elements": []
};
export var configElement = {
    "column": "12",
    "layout": "box",
    "type": "configElement",
    "identifier": ""
};
export var video = {
    "column": "12",
    "layout": "box",
    "type": "video",
    "videoId": "",
    "source": ""
};
export var info = {
    "column": "6",
    "description": "",
    "layout": "box",
    "title": "",
    "type": "info"
};
export var columnOptions = [{label: "half", value: "6"}, {label: "full", value: "12"}];
export var layoutOptions = [{label: "Box", value: "box"}];

export var editor = {
    height: 600,
    browser_spellcheck: true,
    contextmenu: true,
    theme: 'modern',
    plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools'
    ],
    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link mediaModal',
    toolbar2: 'print preview media | forecolor backcolor emoticons',
    image_advtab: true,
    templates: [
        {title: 'Test template 1', content: 'Test 1'},
        {title: 'Test template 2', content: 'Test 2'}
    ],
    content_css: [
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
        '//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
    ]
};


export var publish = {
    "title": "",
    "description": "",
    "column": "12",
    "layout": "box",
    "type": "publish",
    "sources": []
};

export var publish_sources = {
    campaign: {
        "title": "Campaign",
        "column": "12",
        "layout": "box",
        "type": "source",
        "source": "campaign"
    },
    website: {
        "title": "Website",
        "column": "12",
        "layout": "box",
        "type": "source",
        "source": "website"
    },
    facebook: {
        "title": "Facebook",
        "column": "12",
        "layout": "box",
        "type": "source",
        "source": "facebook"
    }
};

export var preview = {
    "title": "",
    "description": "",
    "column": "12",
    "layout": "box",
    "type": "preview",
    "devices": [
        {
            "title": "Desktop",
            "width": "100%",
            "type": "device",
            "id": "desktop"
        },
        {
            "title": "Tablet",
            "width": "788px",
            "type": "device",
            "id": "tablet"
        },
        {
            "title": "Handy",
            "width": "340px",
            "type": "device",
            "id": "mobile"
        }
    ]
};

export var preview_devices = {
    desktop: {
        "title": "Desktop",
        "width": "100%",
        "type": "device",
        "id": "desktop"
    },
    tablet: {
        "title": "Tablet",
        "width": "788px",
        "type": "device",
        "id": "tablet"
    },
    mobile: {
        "title": "Mobile",
        "width": "340px",
        "type": "device",
        "id": "mobile"
    }
};


export var localization = {
    "title": "",
    "description": "",
    "column": "12",
    "layout": "box",
    "type": "localization"
};
