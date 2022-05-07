// 과제 조건
// 1. Member, Dinner interface 만들고 타입 지정하기
// 2. organize 내부 로직 채우기

interface Member {
    name: string;
    group: string;
}

interface Dinner{
    member: Member[];
    shuffle(participants: Member[]): Member[];
    organize(participants: Member[]): void;
}

const dinner: Dinner = {
    member: [
        {
            name: '채정아',
            group: 'ob'
        },
        {
            name: '이서우',
            group: 'yb'
        },
        {
            name: '장서희',
            group: 'yb'
        },
        {
            name: '이현우',
            group: 'ob'
        },
        {
            name: '이승헌',
            group: 'ob'
        }
    ],

    shuffle(participants) {
        participants.sort(() => Math.random() - 0.5);
        return participants;
    },

    organize(participants) {
        //let dinnerMember: string[] = []; 
        const dinnerMember: string[] = [];
        
        this.shuffle(participants);
        
        // let ob: Member = array.filter((member: Member) => (member.group === 'ob'))[0];
        // let yb: Member = array.filter((member: Member) => (member.group ==='yb'))[0];

        // let ob: Member | undefined  = {
        //     name : participants.find((member: Member) => (member.group === 'ob')).name,
        //     group : participants.find((member: Member) => (member.group === 'ob')).group
        // } 이렇게도 가능

        let ob: Member | undefined  = participants.find((member: Member) => (member.group === 'ob')) as Member;
        let yb: Member | undefined = participants.find((member: Member) => (member.group ==='yb')) as Member;
        
        //  if( typeof ob === 'Member'){
           
        //  } interface는 type of 불가능

        if ( typeof ob.name === 'string'){
            //dinnerMember[0] = ob.name; // 직접 인덱스에 접근하는 것은 위험한 방식
            dinnerMember.push(ob.name); // 대신 push를 활용하여 배열의 element를 추가
        }

        if( typeof yb.name == 'string'){
            //dinnerMember[1] = yb.name; 
            dinnerMember.push(yb.name); 
        }
        
        
        console.log(`오늘의 저녁 식사 멤버는 ${dinnerMember[0]}, ${dinnerMember[1]}`);
    }
};

dinner.organize(dinner.member);