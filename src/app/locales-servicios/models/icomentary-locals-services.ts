export interface IcomentaryLocalsServices {
    _id: string;
    id_user: number;
    response: string;
    replies: [{
        _id: string;
        id_user: number;
        response: string;
    }]
}
