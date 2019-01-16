/**
 * Car - абстрактный класс для набора свойств и методов автомобилей.
 */
abstract class Car {
    protected _mileage: number;
    protected _fuel: number;

    public abstract drive(kilometers: number): void;
    public abstract refuel(liters: number): void;
}

/**
 * Audi - набор методов и свойст автомобилей марки Audi
 */
class Audi extends Car {
    protected _mileage: number;
    protected _fuel: number;
    
    constructor(mileage: number = 0, fuel: number = 5) {
        super();
        this._mileage = mileage;
        this._fuel = fuel;
    }

    /**
     * drive - считает количество пройденых километров
     * Подразумевается, что расход топлива 5л на 100км
     * @param {number} kilometers - количество километров
     *      1. Проверяет переданное значение, если оно равно NaN, Infinity или -Infinity выводит сообщение 
     *         о необходимости проверки введенных данных
     *      2. Проверяет, сколько останется топлива, если проехать заданное растояние;
     *      3. Если запас топлива будет больше 0 - обновляет километраж и запас топлива;
     *      4. Если запас топлива будет <= 0:
     *          - считает количетсво километров до окончания запаса топлива;
     *          - обновляет запас топлива и километраж;
     *          - выводит сообщение о том, что топливо закончилось и необходимо заправиться.    
     */
    public drive(kilometers: number): void {
        if (!isFinite(kilometers)) return console.log("Введите правильные данные");

        let fuelResidue: number = this._fuel - kilometers * 0.05

        if (fuelResidue > 0) {
            this._fuel = fuelResidue;
            this._mileage += kilometers; 
        } else {
            let traveledKilometers: number = kilometers - Math.abs(fuelResidue / 0.05);
            this._mileage += traveledKilometers;
            this._fuel -= traveledKilometers * 0.05;
            return console.log(`You drove ${traveledKilometers} kilometers and now should refuel!`);
        }
    }

    /**
     * refuel - обновляет данные о запасе топлива
     * @param {number} liters - количество литров топлиа
     * Проверяет переданное значение, если оно не равно NaN, Infinity или -Infinity обновляет данные о запасе топлива
     */
    public refuel(liters: number): void {
        if (isFinite(liters)) {
            this._fuel += liters;
        }
    }

    /**
     * fuel - выводит данные о запазе топлива
     */
    public get fuel(): number {
        return this._fuel;
    }

    /**
     * mileage - выводит данные о километраже
     */
    public get mileage(): number {
        return this._mileage;
    }
}