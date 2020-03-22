enum PhotoCategory {
  SELFIE = 'SELFIE',
  POTRAIT = 'POTRAIT',
  ACTION = 'ACTION',
  LANDSCAPE = 'LANDSCAPE',
  GRAPHIC = 'GRAPHIC',
}
interface User {
  githubLogin: string;
  name: string;
  postedPhotos?: Photo[];
}
interface Photo {
  id: string;
  name: string;
  description?: string;
  url: string;
  category: PhotoCategory;
  githubUser: string;
  created: string;
}

export const users: User[] = [
  { githubLogin: 'joe', name: 'Joe Buza' },
  { githubLogin: 'alan', name: 'Alan Souza' },
  { githubLogin: 'julien', name: 'Julien Horau' },
  { githubLogin: 'alex', name: 'Alex Rowe' },
];

export const dates: string[] = [
  '3-28-1977',
  '1-2-1985',
  '2018-04-15T19:09:57.308Z',
  new Date().toISOString(),
];

export const photos: Photo[] = users.map(({ githubLogin, name }, index) => ({
  id: `${index}`,
  url: `https://i.picsum.photos/id/911/200/30${index}.jpg`,
  name,
  description: name,
  category: PhotoCategory.POTRAIT,
  githubUser: githubLogin,
  created: dates[index],
}));

export const tags = photos.map(({ id }, index) => ({
  photoId: id,
  userId: users[index].githubLogin,
}));
