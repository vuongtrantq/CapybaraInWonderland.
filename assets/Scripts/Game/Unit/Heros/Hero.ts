import { _decorator, Component, Material, Node, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hero')
export class Hero extends Component {
    @property(Sprite) private sprite: Sprite;
    @property(Material ) private defaultMaterial: Material;
    @property(Material) private whiteMaterial: Material;
    start() {

    }

    update(deltaTime: number) {
        
    }
    public setup(position: Vec3): void {
       


        this.node.setWorldPosition(position);
        this.node.active = true;

    
    }
}


