# scrollgress
custom scrollgress based on the same name project by Michael Lynch
# Usage

```
        jQuery(document).ready(function($) {
            
            $('body').scrollgress({
                height: '12px',
                color: '#45bdff',

                init_success: function() {
                    console.log('初始化成功!');
                },
                reading: function(){
                    var percentageRead = $('.scrollgress__progress').data('percentage');
                     console.log(percentageRead);
                },
                done: function(){
                    console.log('阅读完毕');
                }
            });
        });

```