AFRAME.registerComponent("balls",{
    init:function(){
        this.roll();

    },
    roll:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key==="z"){
                var ball=document.createElement("a-entity")
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.3
                })
                ball.setAttribute("material","color","green")
                var cam=document.querySelector("#camera")
                pos=cam.getAttribute("position")
                ball.setAttribute("position",{
                    x:pos.x,y:pos.y,z:pos.z
                })
                var camera=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene=document.querySelector("#scene")
                ball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0"
                })
                ball.addEventListener("collide",this.fall)
                
                scene.appendChild(ball)
            }

        })
    },
    fall:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var element=e.detail.target.el
        var elementhit=e.detail.body.el
        if(elementhit.id.includes("pin")){
            elementhit.setAttribute("material",{
                opacity:1,
                transparent:true
            })
            var impulse=new CANNON.Vec3(-2,2,1)
            var worldpoint=new CANNON.Vec3().copy(
                elementhit.getAttribute("position")
            )
            elementhit.body.applyImpulse(impulse,worldpoint)
            element.removeEventListener("collide",this.shoot)
            var scene= document.querySelector("#scene")
            scene.removeChild("element")
        }

    }
})