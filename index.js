import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. Datos en memoria (simulación de base de datos)
const usuarios = [
  { id: '1', nombre: 'Ana Pérez', email: 'ana@ejemplo.com', edad: 22 },
  { id: '2', nombre: 'Carlos Soto', email: 'carlos@ejemplo.com', edad: 24 }
];

// 2. Definición del Schema (Type Definitions)
const typeDefs = `#graphql
  type Usuario {
    id: ID!
    nombre: String!
    email: String!
    edad: Int
  }

  type Query {
    obtenerUsuarios: [Usuario]
    obtenerUsuario(id: ID!): Usuario
  }

  type Mutation {
    crearUsuario(nombre: String!, email: String!, edad: Int): Usuario
  }
`;

// 3. Resolvers: lógica detrás de cada operación
const resolvers = {
  Query: {
    obtenerUsuarios: () => usuarios,
    obtenerUsuario: (_, { id }) => usuarios.find(u => u.id === id)
  },
  Mutation: {
    crearUsuario: (_, { nombre, email, edad }) => {
      const nuevoUsuario = {
        id: String(usuarios.length + 1),
        nombre,
        email,
        edad
      };
      usuarios.push(nuevoUsuario);
      return nuevoUsuario;
    }
  }
};

// 4. Inicialización del servidor
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀 Servidor GraphQL listo en: ${url}`);
