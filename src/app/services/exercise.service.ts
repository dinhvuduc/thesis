import { HttpClient } from "@angular/common/http";
import { Exercise } from "../types/exercise";

export class ExerciseService{
 constructor(private readonly http: HttpClient){}
 generateExercise(target:string, goal:string): Exercise[]{
// this.http.get('/exercise')
return[
 {
  name: 'Incline Smith Machine Press',
  instructions: [
    'Lying under a smith machine, ensure that the bar is aligned with your nipple height when it contacts your body. Keep elbows flared to a maximum of 45 degrees from your torso, hands slightly wider than shoulder width.',
    'With a bench inclined between 30 and 45 degrees, hold the bar directly above your chest.',
  ],
  reps: 2,
  sets: 3,
  type: 'abc',
},
{
  name: 'Overhand Dumbbell Bentover Row',
  instructions: [
    'Begin standing, with your hands either side of your body holding the dumbbells. With a slight bend in your knees, hinge at your hips until your torso is angled 45 degrees forward. Imagine pulling your elbows back behind you to complete the row.',
    'Perform this movement with a pronated grip, palms facing towards your feet.',
  ],
  reps: 2,
  sets: 3,
  type: 'abc',
},
{
  name: 'Deadlift',
  instructions: [
    'Standing with the bar over your feet, grip it overhand shoulder width apart, while ensuring you back remains straight throughout the entire exercise. Begin the lift by straightening your legs, dragging the bar up your shins, and as soon as the bar is above knee height, straighten your torso and lean back to heavy the bar off the ground. In reverse, you start standing tall, and with a micro bend in your knees, you hinge at the hips (maintaining a straight) back until the bar is over you knees, at which point your hips stop hinging and your knees start bending until the bar touches the ground. This exercise may also be done with a sumo stance.',
  ],
  reps: 2,
  sets: 3,
  type: 'abc',
},
{
  name: 'Neutral Grip Unilateral Seated Row',
  instructions: [
    'With the handle attachment, row your elbow back and pull your hand and the handle to your hip, and then release forwards.',
    'Perform this movement with a neutral grip, palms facing towards your body.',
  ],
  reps: 2,
  sets: 3,
  type: 'abc',
},
];
 }
}