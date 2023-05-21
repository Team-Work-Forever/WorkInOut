export interface Data {
  name: string;
  description: string;
  img?: string;
}

export function loadTourismPoints(): Data[] {
  return [
    {
      name: 'Praia',
      description:
        'A praia da Póvoa é uma das atrações turísticas mais populares da cidade. É uma praia extensa com uma bela vista para o Oceano Atlântico e uma grande variedade de atividades, incluindo natação, surf, windsurf e vela.',
      img: '/tourismPoints/praia.png',
    },
    {
      name: 'Igreja Matriz',
      description:
        'A igreja matriz é um edifício histórico situado no coração da cidade. Data do século XVIII e tem uma bela fachada barroca. A igreja é dedicada a São Pedro, padroeiro da cidade.',
      img: '/tourismPoints/igrejaMatriz.png',
    },
    {
      name: 'Forte de Nossa Senhora das Dores',
      description:
        'O Forte de Nossa Senhora das Dores é uma fortaleza construída no século XVIII para proteger a cidade de invasores. Hoje, é um ponto turístico popular que oferece uma vista incrível da costa e do oceano.',
      img: '/tourismPoints/forte.png',
    },
    {
      name: 'Casino',
      description:
        'O Casino da Póvoa é um dos maiores casinos da Europa. Ele oferece uma variedade de jogos de casino, bem como um restaurante, bares e um espaço para shows.',
      img: '/tourismPoints/casino.png',
    },
    {
      name: 'Mercado Municipal',
      description:
        'O Mercado Municipal é um ótimo lugar para experimentar a culinária local e comprar produtos frescos. O mercado oferece uma grande variedade de peixes, frutas, legumes e outros produtos alimentares.',
      img: '/tourismPoints/mercado.png',
    },
    {
      name: 'Parque da Cidade',
      description:
        'O Parque da Cidade é um grande parque público com trilhas para caminhadas, áreas de piquenique, parques infantis, uma pista de corrida e um lago.',
      img: '/tourismPoints/parqueCidade.png',
    },
    {
      name: 'Câmara Municipal',
      description:
        'A Câmara Municipal da Póvoa de Varzim é responsável pela gestão de vários espaços públicos que oferecem atividades ao ar livre e lazer para os seus habitantes e visitantes.',
      img: '/tourismPoints/camaraMunicipal.png',
    },
    {
      name: 'Rua da Junqueira',
      description:
        'Área reservada a peões, desde 1955, tem um papel fundamental no tecido urbano. Com um forte sentido de local de encontro e excelente vitalidade comercial, é rica em construções dos séculos XIX e princípio do século XX.',
      img: '/tourismPoints/ruaJunqueira.png',
    },
    {
      name: 'Praça do Almada',
      description:
        'Centro cívico da cidade, está circundada por um conjunto arquitetónico de grande apuramento estético, onde ao granito presente nas fachadas se acrescentam o azulejo e o ferro forjado. Nesta praça estão símbolos que marcam a história da Póvoa de Varzim, como o edifício dos Paços do Concelho, o Monumento a Eça de Queirós, o Pelourinho e o Coreto.',
      img: '/tourismPoints/pracaAlmada.png',
    },
    {
      name: 'Igreja Românica de S. Pedro de Rates',
      description:
        'Este templo teve na sua origem uma capela modesta da época da Reconquista que foi reedificada em finais do séc. XI, por iniciativa de D. Henrique e D. Teresa. O edifício ganha outra projeção no tempo de D. Afonso Henriques (1º rei português), quando se inicia a construção da atual igreja, em meados no séc. XII, tendo as obras terminado um século mais tarde.',
      img: '/tourismPoints/igrejaRates.png',
    },
    {
      name: 'Cividade de Terroso',
      description:
        'Esta elevação de 153 m de altitude regista um longo período de ocupação (séc. VIII a.C. - séc. III d.C.) e forneceu já importantes elementos de estudo para a história dos povos castrejos e da implantação romana.',
      img: '/tourismPoints/cividadeTerroso.png',
    },
    {
      name: 'Aqueduto',
      description:
        'Esta construção contava inicialmente com 999 arcos e transportava a água desde uma nascente em Terroso, junto ao nicho de Santo António, para o Mosteiro de Santa Clara, em Vila do Conde. Construído entre 1705 e 1714, o aqueduto atravessa as freguesias de Beiriz e Argivai, no concelho da Póvoa de Varzim, e a estrutura dos seus arcos vai crescendo em envergadura à medida que se aproxima do destino. Atualmente é ainda visível uma grande parte da construção original, embora já muito fracionada.',
      img: '/tourismPoints/aqueduto.png',
    },
    {
      name: 'Monte de S. Félix',
      description:
        'Ponto panorâmico privilegiado, permite observar toda a região e notar a sua diversidade marítima, campesina e urbana, sendo também facilmente percetível a transição entre a planície litoral e a ondulada região interior.',
      img: '/tourismPoints/monteFelix.png',
    },
    {
      name: 'Farol da Lapa',
      description:
        'Farol Português já desativado, que se localiza na Igreja de Nossa Senhora da Lapa, na Cidade da Póvoa de Varzim.',
      img: '/tourismPoints/farolLapa.png',
    },
    {
      name: 'Academia de ténis',
      description:
        'Localizada junto à praia no contexto de um diversificado complexo desportivo, dispõe de 3 campos de ténis descobertos, 2 campos de ténis cobertos e 2 campos de squash.',
      img: '/tourismPoints/tenis.png',
    },
    {
      name: 'Campo de golfe da Estela',
      description:
        'O campo de Golf da Estela está situado numa zona magnífica com comodidades de 1ª classe. O campo é composto por 18 buracos, academia de golf, aulas de golf, restaurante, bar, snack-bar, golf shop, driving range, 3 putting  greens, chipping  green & bunker, aluguer de tacos, trolleys, buggies, praia e sauna.',
      img: '/tourismPoints/golfe.png',
    },
    {
      name: 'Clube de Tiro de S. Pedro de Rates',
      description:
        'Um dos melhores do país vocacionado para a alta competição em várias disciplinas da área, possibilita a prática de tiro desportivo com armas de caça, tiro à bala e tiro com arco. Está preparado para receber competições de dimensão internacional, equipado com 5 fossos universais; 4 fossos olímpicos; 5 campos para tiro às hélices e tiro ao voo; 4 instalações de compak sporting e ainda 3 instalações para percurso de caça.',
      img: '/tourismPoints/tiro.png',
    },
  ];
}
