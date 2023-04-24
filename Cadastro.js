function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
  
    const handleCadastro = (event) => {
      event.preventDefault();
  
      auth.createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
          const { uid } = userCredential.user;
  
          db.collection('usuarios').doc(uid).set({
            nome,
            sobrenome,
            dataNascimento,
            email,
          });
        })
        .catch((error) => {
          console.log('Erro ao cadastrar usuário:', error);
        });
    };
  
    return (
      <form onSubmit={handleCadastro}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
  
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          required
        />
  
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
  
        <label htmlFor="sobrenome">Sobrenome:</label>
        <input
          type="text"
          id="sobrenome"
          value={sobrenome}
          onChange={(event) => setSobrenome(event.target.value)}
          required
        />
  
        <label htmlFor="dataNascimento">Data de Nascimento:</label>
        <input
          type="date"
          id="dataNascimento"
          value={dataNascimento}
          onChange={(event) => setDataNascimento(event.target.value)}
          required
        />
  
        <button type="submit">Cadastrar</button>
      </form>
    );
  }
  
  export default Cadastro;