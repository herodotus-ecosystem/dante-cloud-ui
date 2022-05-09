export interface List<E> {
	/**  LinkedList + ArrayList 通用接口 */
	/**
	 * 添加对象
	 * @param object
	 */
	add(object: E): void;
	/**
	 * 指定索引添加对象
	 * @param index
	 * @param object
	 */
	add(index: number, object: E): void;
	/**
	 * 指定索引删除对象
	 * @param index
	 */
	remove(index: number): boolean;
	/**
	 * 具体对象删除
	 * @param object
	 */
	remove(object: E): boolean;
	/**
	 * 通过索引获取对象，for循环获取必备
	 * @param index
	 */
	get(index: number): Object;
	/**
	 * 获取list长度
	 */
	size(): Number;
	/**
	 * 修改指定索引数据
	 * @param index
	 * @param Object
	 */
	update(index: number, Object: E): void;
}

class ArrayList<E> implements List<E> {
	// 定义属性集合
	private elementData: Object[] = [];

	// ArrayList实际数量
	private sizeNum: number = 0;

	/**
	 * TODO  构造函数初始化集合大小
	 * @param null
	 * @date  2019/11/19 15:18
	 * @return
	 */
	constructor();
	constructor(initialCapacity: number);
	constructor(initialCapacity?: any) {
		if (typeof initialCapacity === 'number') {
			//设置初始集合大小
			if (initialCapacity < 0) {
				throw new Error('is no arrayList index : ' + initialCapacity);
			}
			this.elementData = new Array<Object>(initialCapacity);
		} else {
			//初始化集合大小
			this.constructor(10);
		}
	}

	/**
	 * TODO  添加
	 *
	 * @param arg0 = 只有一个参数的时候为对象值，存在两个参数的时候为下标（index）
	 * @param arg1 = 当存在两个参数的时候为对象值
	 * @date  2019/11/19 17:30
	 * @return
	 */
	add(object: E): void;
	add(index: number, object: E): void;
	add(arg0?: any, arg1?: any) {
		if (typeof arg0 === 'number') {
			//索引添加
			this.ensureExplicitVapacity();
			this.rangeCheck(arg0);
			this.elementData.splice(arg0, 0, arg1);
			this.sizeNum++;
		} else {
			//普通添加,容量计算
			this.ensureExplicitVapacity();
			this.elementData[this.sizeNum] = arg0;
			this.sizeNum++;
		}
	}

	/**
	 * TODO  通过下标查询对象
	 * @param index 索引
	 * @date  2019/11/19 16:15
	 * @return
	 */
	get(index: number): Object {
		this.rangeCheck(index);
		return this.elementData[index];
	}

	/**
	 * TODO  更新数据
	 * @param index 下标
	 * @param 对象数据
	 * @date  2019/11/19 18:19
	 * @return
	 */
	update(index: number, Object: E): void {
		this.rangeCheck(index);
		this.elementData[index] = Object;
	}

	/**
	 * TODO  删除
	 *
	 * @param null
	 * @date  2019/11/19 16:15
	 * @return
	 */
	remove(object: E): boolean;
	remove(index: number): boolean;
	remove(arg0: number | E): boolean {
		if (typeof arg0 === 'number') {
			//删除指定下标数据
			this.elementData.splice(arg0, 1);
			this.sizeNum--;
			return true;
		} else {
			//删除具体数据,数据多不建议使用
			let result = false;
			for (let i = 0; i < this.sizeNum; i++) {
				if (this.get(i) === arg0) {
					result = this.remove(i);
				}
			}
			return result;
		}
	}

	/**
	 * TODO 获取集合长度
	 * @date  2019/11/19 16:15
	 * @return
	 */
	public size(): number {
		return this.sizeNum;
	}

	/**
	 * TODO 检测数组是否下标越界，是抛出越界异常
	 *
	 * @param index
	 */
	private rangeCheck(index: number): void {
		if (index >= this.sizeNum || index < 0) {
			throw new Error('is no index--->' + index);
		}
	}

	/**
	 *  TODO 自动扩容 1.5X
	 *  << : 左移运算符，num << 1, 相当于num乘以2
	 *  >> : 右移运算符，num >> 1, 相当于num除以2
	 */
	public ensureExplicitVapacity(): void {
		if (this.elementData.length < this.sizeNum + 1) {
			// 当前集合实际容量
			let oldCapacity: number = this.elementData.length;
			//扩容1.5倍后的数
			let newCapacity: number = oldCapacity + (oldCapacity >> 1);
			//修改集合容量
			this.elementData.length = newCapacity;
			//console.log(this.elementData.length+"--> "+newCapacity + "--》"+this.elementData);
		}
	}
}
