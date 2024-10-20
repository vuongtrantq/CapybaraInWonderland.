import { _decorator, Component, Enum, Node, Prefab, Vec3 } from 'cc';
import { GameMatchLogic } from './GameMatchLogic';
import { ObjectPool } from '../Services/ObjectPool';
import { Hero } from './Unit/Heros/Hero';
const { ccclass, property } = _decorator;

export enum HeroGraphicsType {
    hero1 = 0,
    hero2 =1,
    hero3 = 2,
    hero4 ,
    hero5 ,
    hero6 ,

}
const ts = 100;

@ccclass('HeroObject')
export class HeroObject {

    @property({
        type: Enum(HeroGraphicsType)
    })
    name: HeroGraphicsType = HeroGraphicsType.hero1;

    @property({
        type: Prefab
    })
    prefab: Prefab = null;

}

@ccclass('BoardMatchingHero')
export class BoardMatchingHero extends Component {
    
    @property(HeroObject) private heros: HeroObject[] = [];
    gameLogic: GameMatchLogic = new GameMatchLogic();
    private heroGraphicsTypeToPool = new Map<HeroGraphicsType, ObjectPool<Hero>>();


    init() { 
        this.gameLogic.setup();

        for (const hero of this.heros) {
            const enemyPool: ObjectPool<Hero> = new ObjectPool(hero.prefab, this.node, 50, "Hero");
            this.heroGraphicsTypeToPool.set(<HeroGraphicsType>hero.name, enemyPool);
        }

        this.spawnBoard();
    }

    spawnBoard() {
        let gird = this.gameLogic.Grid;
        for (let i = 1; i <= gird.length; i++) { 
            for (let j = 1; j <= gird[j].length; j++) {
                let type = gird[i][j].kind ;
                let x =  i*ts;
                let y = j*ts;
                this.spawnNewHero(x,y,type);
            }
        }
    }

    public spawnNewHero(positionX: number, positionY: number, id: HeroGraphicsType): Hero {
        const enemy = this.heroGraphicsTypeToPool.get(<HeroGraphicsType>id).borrow();
        const spawnPosition = new Vec3(positionX,positionY,0);
        enemy.setup(spawnPosition);
        return enemy;
        // if (!this.idToSettings.has(id)) {
        //     throw new Error("Does not have setting for enemy " + id);
        // }

        // const enemySettings = this.idToSettings.get(id);

        
        // const spawnPosition = new Vec3();
        // spawnPosition.x = this.targetNode.worldPosition.x + positionX;
        // spawnPosition.y = this.targetNode.worldPosition.y + positionY;
        // enemy.setup(spawnPosition, enemySettings);

        // enemy.DeathEvent.on(this.returnEnemy, this);
        // enemy.LifetimeEndedEvent.on(this.returnEnemy, this);

        // this.enemyAddedEvent.trigger(enemy);

        // return enemy;
    }

    // public returnEnemy(enemy: Hero): void {
    //     enemy.DeathEvent.off(this.returnEnemy);
    //     enemy.LifetimeEndedEvent.off(this.returnEnemy);

    //     console.log(enemy.name);
    //     this.enemyGraphicsTypeToPool.get(<EnemyGraphicsType>enemy.node.name).return(enemy);

    //     this.enemyRemovedEvent.trigger(enemy);
    // }
}


