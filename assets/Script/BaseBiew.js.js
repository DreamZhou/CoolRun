
cc.Class({
    extends: cc.Component,

    properties: {
        m_Hero:cc.Sprite,
        m_BtnRoll:cc.Button,
        m_Back1:cc.Node,
        m_Back2:cc.Node,
        m_Back3:cc.Node,
    },

    start () {
        cc.log('start');
        let heroAnim= this.m_Hero.getComponent(cc.Animation);
        heroAnim.play('Run');
        this.m_BtnRoll.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)
        this.m_BtnRoll.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
        this.m_BtnRoll.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this)
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
   moveCallBack(target,moveDistance){
       const childNum = target.children.length;
       for (const key in target.children) {
           if (target.children.hasOwnProperty(key)) {
               const child = target.children[key];
               let worldPos = target.convertToWorldSpace(child.position);
               if(worldPos.x <-moveDistance -10){
                child.setPositionX(child.getPositionX()+moveDistance*childNum);
               }              
           }
       }

   },
   update (dt) {
    let BG1PoxX = this.m_Back1.getPositionX();
    this.m_Back1.setPositionX(BG1PoxX - dt *BG1MoveSpeed );
    this.moveCallBack(this.m_Back1,MoveDistance1);

    let BG2PoxX = this.m_Back2.getPositionX();
    this.m_Back2.setPositionX(BG2PoxX - dt *BG2MoveSpeed );
    this.moveCallBack(this.m_Back2,MoveDistance2);

    let BG3PoxX = this.m_Back3.getPositionX();
    this.m_Back3.setPositionX(BG3PoxX - dt *BG3MoveSpeed );
    this.moveCallBack(this.m_Back3,MoveDistance3);
   },
});
