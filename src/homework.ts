/**
 * Car - абстрактный класс для набора свойств и методов автомобилей.
 */
abstract class Car {
    protected mileage: number;
    protected fuel: number;

    public abstract drive(kilometers: number): void;
    public abstract refuel(liters: number): void;
}

/**
 * Audi - набор методов и свойст автомобилей марки Audi
 */
class Audi extends Car {
    constructor(protected mileage: number = 0, protected fuel: number = 5) {
        super();
    }

    /**
     * drive - считает количество пройденых километров
     * Подразумевается, что расход топлива 5л на 100км
     * @param {number} kilometers - количество километров
     *      1. Проверяет переданное значение, если оно не равно NaN, Infinity или -Infinity:
     *      2. Проверяет, сколько останется топлива, если проехать заданное растояние;
     *      3. Если запас топлива будет больше 0 - обновляет километраж и запас топлива;
     *      4. Если запас топлива будет <= 0:
     *          - считает количетсво километров до окончания запаса топлива;
     *          - обновляет запас топлива и километраж;
     *          - выводит сообщение о том, что топливо закончилось и необходимо заправиться.    
     */
    public drive(kilometers: number): void {
        if (isFinite(kilometers)) {
            let fuelResidue: number = this.fuel - kilometers * 0.05

            if (fuelResidue > 0) {
                this.fuel = fuelResidue;
                this.mileage += kilometers; 
            } else {
                let traveledKilometers: number = kilometers - Math.abs(fuelResidue / 0.05);
                this.mileage += traveledKilometers;
                this.fuel -= traveledKilometers * 0.05;
                return console.log(`You drove ${traveledKilometers} kilometers and now should refuel!`);
            }
        }
    }

    /**
     * refuel - обновляет данные о запасе топлива
     * @param {number} liters - количество литров топлиа
     * Проверяет переданное значение, если оно не равно NaN, Infinity или -Infinity обновляет данные о запасе топлива
     */
    public refuel(liters: number): void {
        if (isFinite(liters)) {
            this.fuel += liters;
        }
    }

    /**
     * parameters - выводит данные о километраже и запазе топлива
     */
    public get parameters(): string {
        return "Mileage: " + this.mileage + "; Fuel: " + this.fuel;
    }
}