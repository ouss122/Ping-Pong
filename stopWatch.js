function Time(){
    let started=false;
    let utime;  
    let etime;
    let t=0;
    this.start= function (){
       if (! started) {
          started=true; 
          utime=new Date();
       }else{
           throw new Error('the watch already started');
       }
    }
    this.pause= function (){
        if (started){
            started=false;
            etime= new Date();
        }
        else{
            throw new Error('the watch not working');
        }
    }
    this.stop = function (){
        if (started){
            started=false;
            etime= 0;
            utime=0;
        }
        else if (t===0){  
             throw new Error('the watch not working');

        }else{
            t =0;
        }
    }

  Object.defineProperty(this,'duration',{
      get :function (){
        if (started){
            etime= new Date();
            let time = (etime.getTime() -utime.getTime())/1000;
            return time;
        }else if (etime!==0){
            let time = (etime.getTime() -utime.getTime())/1000;
            return time;
        }
     }})
}

let time= new Time();

let k=new Date();
console.log(k.getTime());