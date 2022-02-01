export class LeaveModel{
    constructor(
        public eId: String,
        public fromdate:Date,
        public todate:Date,
        public reason:String
    ){}
}