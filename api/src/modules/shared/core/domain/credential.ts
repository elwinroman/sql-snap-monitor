export interface Credential {
  host: string
  database: string
  user: string
  password: string
}

// export class Credential {
//   constructor(private atributes: PrimitiveCredential) {}
//   static create(createCredential: { hostt: string; dbnamee: string; userr: string; passwordd: string }): Credential {
//     return new Credential({
//       host: createCredential.hostt,
//       dbname: createCredential.dbnamee,
//       user: createCredential.userr,
//       password: createCredential.passwordd,
//     })
//   }
// }
