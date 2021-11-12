const redemption = 420;
let discount;

if (redemption > 0 && redemption <= 350) {
    discount = 0;
} else if (redemption > 351 && redemption <= 1350) {
    discount = (15 * 100 / redemption);
} else if (redemption > 1351 && redemption <= 2700) {
    discount = (30 * 100 / redemption);
} else if (redemption > 2701 && redemption <= 6500) {
    discount = (45 * 100 / redemption);
}

console.log(discount);



/*4 */

function sum(a, b) {
    return a + b;
}

console.log(sum(1, 5));



/*5*/
let obj = {
    firstName: "John",
    lastName: "Dou"
}

function getFullName(object) {
    return object.firstName + " " + object.lastName;
}

console.log(getFullName(obj));



/* 6 */

function isOdd(n) {
    return n % 2 == 0;
}

console.log(isOdd(3));
console.log(isOdd(4));


/* 7 */

function getShortest(wordArray) {
    return wordArray.reduce(function (a, b) {
        return a.length <= b.length ? a : b;
    })
}

console.log(getShortest(["one", "two", "three"]));


/* 8 */

function getGoogle(n) {
    let o = 'o';
    return `g${o.repeat(n)}gle`;
}

console.log(getGoogle(5)) // gooooogle

/* 9 */

function getUser(firstName, lastName, age) {
    let fn = firstName || "name";
    let ln = lastName || "lastname";
    let a = age || "age";

    return {
        firstName: fn,
        lastName: ln,
        age: a,
    }
}

console.log(getUser("John", "Dou", 42));

/*10 */
let path = [{
    direction: "Kiyv - Minsk",
    distance: 567
}, {
    direction: "Kiyv - Paris",
    distance: 2402
}];

function getTotalPath(path) {
    return path.reduce(function (a, b) {
        return a.distance + b.distance;
    })
}

console.log(getTotalPath(path));



/*11 */



function discountFunction(percentage) {
    return function (amount) {
        return amount - (amount * percentage / 100);
    };
}

const discount10 = discountFunction(10);
console.log(discount10(90)); // 81
console.log(discount10(100)); // 90


/*12 */



/**
 * Write the methods inside the given objects that:
 * 1. console logs keys of the given object (please use for..in cycle)
 * 2. returns the string 'My name is John Doe and I am 25 years old. My best friend is Daniel'
 * reffering to the data stored in the object. The string should be constructed using the properties from the object
 */

const myObject = {
    name: 'John',
    lastName: 'Doe',
    age: 25,
    friends: ['Mike', 'Alan', 'Daniel'],
    keys() {
        for (const key in this) {
            console.log(key);
        }
    },
    call() {
        return `My name is ${this.name} ${this.lastName} and I am ${this.age} years old. My best friend is ${this.friends[this.friends.length - 1]}`;
    }

};

myObject.keys();

console.log(myObject.call());