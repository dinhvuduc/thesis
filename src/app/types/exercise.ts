export interface Exercise{
 name:string;
 targets:string[];
 instructions:string[];
 reps:string;
 sets:number;
 type:string;
}

export interface Exercise2{
 _id:string;
 name: string;
 equipment: string;
 target: string;
 relatedTarget: string;
 reps: number;
 sets: number;
 video: string;
 instructions: string[];
}