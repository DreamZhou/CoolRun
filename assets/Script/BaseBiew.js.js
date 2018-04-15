
cc.Class({
    extends: cc.Component,

    properties: {
        m_Hero:cc.Sprite,
        m_BtnRoll:cc.Button,
        m_Back1:cc.Node,

    },

    start () {
        cc.log('start');
        let heroAnim= this.m_Hero.getComponent(cc.Animation);
        heroAnim.play('Run');
        this.m_BtnRoll.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)
        this.m_BtnRoll.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
        this.m_BtnRoll.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this)

        let move0 = cc.moveBy(2.5,cc.p(-250,0));
        // this.m_Back1[0].runAction(cc.sequence(move0,cc.callFunc(this.moveCallBack,this)));
        // let move1 = cc.moveTo(10.0,cc.p(-500,25));
        this.m_Back1.runAction(cc.repeatForever(cc.sequence(move0,cc.callFunc(this.moveCallBack,this))));
    },
    touchStart(){
        cc.log('touchStart');
        let heroAnim= this.m_Hero.getComponent(cc.Animation);
        cc.log('currentClip.name--->'+heroAnim.currentClip.name);
        if( heroAnim.currentClip.name == 'Jump'){
            return;
        }
        this.m_Hero.node.y=-58.0;
        heroAnim.play('Roll');

    },
    touchEnd(){
        cc.log('touchEnd');
        let heroAnim= this.m_Hero.getComponent(cc.Animation);
        if( heroAnim.currentClip.name == 'Jump'){
            return;
        }
        this.m_Hero.node.y=-50.5;
        heroAnim.play('Run');        
    },
   onAnimationChange(target,data){
       cc.log('onAnimationChange');
       cc.log('data -- >'+data );
       let heroAnim= this.m_Hero.getComponent(cc.Animation);
       if( heroAnim.currentClip.name != 'Run'){
        return;
    }
       heroAnim.play(data);
       this.m_Hero.node.y=-50.5; 
       if(data === 'Jump'){
           let position = this.m_Hero.node.position;
           let moveUp = cc.moveTo(1,cc.p(position.x,42)).easing(cc.easeCubicActionOut());
           let moveDown = cc.moveTo(1,position).easing(cc.easeCubicActionIn());
           let callBack=cc.callFunc(function(){
            let heroAnim= this.m_Hero.getComponent(cc.Animation);
            this.m_Hero.node.y=-50.5;
            heroAnim.play('Run'); 
           },this);
          this.m_Hero.node.runAction(cc.sequence(moveUp,moveDown,callBack));
       }
   }, 
   isCanChangeClip(clipName){
   },
   moveCallBack(target){
       const childNum = target.children.length;
       for (const key in target.children) {
           if (target.children.hasOwnProperty(key)) {
               const child = target.children[key];
               let worldPos = target.convertToWorldSpace(child.position);
               cc.log('worldPos -->'+ worldPos);
               if(worldPos.x <-500.0){
                   cc.log('positionx -- >' + child.getPositionX()+490*childNum);
                child.setPositionX(child.getPositionX()+490*childNum);
               }              
           }
       }

   },
    // update (dt) {},
});
