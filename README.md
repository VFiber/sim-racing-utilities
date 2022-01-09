# SimRacing Utilities

Right now this is a very basic PWA application to help plan your stints / races in online sim racing events.

The main goal during the development was to be able to use an ad-free calculator on every platform.
It is a PWA and can be installed on fairly modern Android or iOS devices, optimized for mobile.

## Demo
Dev snapshots available at:  https://fuel-dev.unr.hu/

## Live
- The app has no stable release yet, first stable is gonna be 1.0
- If you wanna help the hosting & domain costs you can [do it here](https://www.paypal.com/donate?business=WAXS27BEDLL9E&no_recurring=1&currency_code=HUF)

## Features
- Fuel calculator for Time and Lap based races

## Future-Feature plans
- Save feature (to IndexedDB) with Tracks & Setups (Car, Weather, Driver, etc)  
- Add stint planner based on the previously saved data for multiclass / endurance racing.

## But wait...
#### It is over-engineered!
By design, this is a perfect pet project and I have no obligation to make sensible decisions on the architecture.

#### It is ugly!
I am a developer / sysadmin (DevOps if you want), I can set you up a server with ansible, docker, write software in various languages, fix your iptables rules, but UX & design is my weakest point. 
Feel free to throw me design ideas, I will implement it.
#### I want to see X feature in it!
Me too, you can improve the code and make a PR. If you have no idea what I am talking about, you can hire me.

### How to build
`nx build --prod`

Testing has a lot of room for improvement, but:
- `npm run test:all`
- `npm run lint:all`
