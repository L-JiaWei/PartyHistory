        let lunbo = document.getElementById('lunbo')
        let container = document.getElementById('container')
        let warp = document.getElementById('warp')
        let buttons =document.getElementById('buttons')
        let spans=document.getElementById('buttons').getElementsByTagName('span')
        let imgs = document.getElementsByName('img')
        let picWidth = 600
        let timer1, timer2,timer3; //定时器
        let index=0;
        container.scrollLeft = -(picWidth * index)
        warp.style.left = 0+"px";

        function init(){//入口函数
            for(let i = 0; i<spans.length; i++){
                spans[i].onmouseover = function(){
                    oldIndex = index
                    newIndex = this.getAttribute('index')
                    offset = 600*(oldIndex - newIndex)
                    move_pic(offset)
                    index = newIndex-1
                    spansShow()
                }
            }
            autoPlay()
            container.onmouseover=stopMove;
            container.onmouseout=autoPlay;
        }

        function move_pic(size){//图片移动  主逻辑代码
            let oldleft = parseInt(warp.style.left)
            let newleft = oldleft + size    
            // warp.style.left = container.scrollLeft
            // if(newleft<-picWidth*4){
            //     let now = parseInt(warp.style.left);
                // if(now <=0){
                    // clearInterval(timer2)
                    // clearInterval(timer1)
                //     clearInterval(timer3)
                //     timer3 = setInterval(function(){
                        
                //             now+=30;
                //             warp.style.left = now + "px";
                        
                //         console.log(233)
                //     }, 50)
                // }
            // }
            // if(newleft>0){
            //     newleft = -picWidth*4
            // }   
            if(size<0){
                index++;
                if(index>4) {
                    // index=0
                    let now = parseInt(warp.style.left);
                    
                        clearInterval(timer3)
                        timer3 = setInterval(function(){
                            if(now <=0){
                                now+=30;
                                warp.style.left = now + "px";
                            }else{
                                clearInterval(timer3)
                                index=0;
                            }
                        }, 10)
                }
            }
            if(size>0){
                index--
                if(index<0) index=4
            }
            spansShow()
            slowMove()
            
        }

        function autoPlay(){//自动播放
            timer = setInterval("move_pic(-picWidth)", 2000)
        }
        function stopMove(){//停止播放
            clearInterval(timer)
        }
        function spansShow(){//原点显示
            for(let i = 0; i<spans.length; i++){
                spans[i].className = ''
            }
            spans[index].className = 'on'
        }
        
        function slowMove(){
            let start;
            let speed;
            if(index == 0){
               start = container.scrollLeft
               console.log(233)
               speed = 0;
            }else{
               start = -(index * picWidth)+600
               speed = -30;
            }
            let end = -(index * picWidth)
            let busu = 0
            clearInterval(timer2)
            timer2 = setInterval(function(){
                busu++
                if(busu == 20){
                    clearInterval(timer2)
                    warp.style.left = end + 'px'
                }else{
                    start += speed;
                    warp.style.left = start + 'px'
                }
            }, 50)
        }
        window.onload = init //程序入口