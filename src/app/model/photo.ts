export class Photo {
  public_id: string;
  context: any;
  name: string;
  url: any;
  fullUrl: any;
  surname: string;
}

export class Team {
  constructor(public name: string) { }
  photos: Photo[] = [];
}
