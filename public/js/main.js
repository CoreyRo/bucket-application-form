$(document)
    .ready(function ($) {
        $('.summernote').summernote({
            tabsize: 2,
            height: 200,
            callbacks: {
                onPaste: function (e) {},
                onChange: function (contents, $editable) {
                    $('.summernote').val(contents)
                }
            },
            toolbar: [
                // [groupName, [list of button]]
                [
                    'style',
                    ['bold', 'italic', 'underline', 'clear']
                ],
                ['font', ['strikethrough']
                ],
                ['fontsize', ['fontsize']
                ],
                ['color', ['color']
                ],
                [
                    'para',
                    ['ul', 'ol', 'paragraph']
                ],
                ['height', ['height']
                ]
            ]
        })

        $('.summernote').each(function () {
            if ($(this).data('validator')) 
                $(this).data('validator').settings.ignore = ".note-editor *";
            }
        )})
