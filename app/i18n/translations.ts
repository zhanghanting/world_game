import { defaultLocale } from './config';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// 翻译字典，按语言代码组织
const translations: Translations = {
  'en': {
    // 导航
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.new': 'New Games',
    'nav.trending': 'Trending',
    'nav.featured': 'Featured',
    'nav.updated': 'Updated',
    'nav.all': 'All Games',
    'nav.search': 'Search games...',
    'nav.recent': 'Recently Played',
    
    // 首页
    'home.hero.title': 'World of Games',
    'home.hero.subtitle': 'Endless Entertainment',
    'home.hero.description': 'Discover hundreds of free games to play directly in your browser. No downloads, no installs - just instant fun!',
    'home.featured': 'Featured Games',
    'home.popular': 'Popular Games',
    'home.recent': 'Recently Added',
    'home.explore': 'Explore Games',
    'home.viewAll': 'View All',
    
    // 游戏卡片
    'game.play': 'Play Now',
    'game.info': 'More Info',
    'game.category': 'Category',
    'game.rating': 'Rating',
    
    // 游戏类别
    'categories.originals': 'Original Games',
    'categories.multiplayer': 'Multiplayer',
    'categories.twoPlayer': '2-Player Games',
    'categories.action': 'Action Games',
    'categories.adventure': 'Adventure Games',
    'categories.basketball': 'Basketball',
    'categories.beauty': 'Beauty Games',
    'categories.bike': 'Bike Games',
    'categories.car': 'Car Games',
    'categories.card': 'Card Games',
    'categories.casual': 'Casual Games',
    'categories.clicker': 'Clicker Games',
    'categories.controller': 'Controller Games',
    'categories.dressUp': 'Dress Up Games',
    'categories.driving': 'Driving Games',
    'categories.escape': 'Escape Games',
    'categories.flash': 'Flash Games',
    'categories.fps': 'FPS Games',
    'categories.horror': 'Horror Games',
    
    // 通用
    'button.back': 'Back',
    'button.next': 'Next',
    'loading': 'Loading...',
    'error': 'Something went wrong',
    'settings': 'Settings',
    'language': 'Language',
  },
  
  'zh-CN': {
    // 导航
    'nav.home': '首页',
    'nav.categories': '分类',
    'nav.new': '新游戏',
    'nav.trending': '热门',
    'nav.featured': '精选',
    'nav.updated': '更新',
    'nav.all': '所有游戏',
    'nav.search': '搜索游戏...',
    'nav.recent': '最近玩过',
    
    // 首页
    'home.hero.title': '游戏世界',
    'home.hero.subtitle': '无尽娱乐',
    'home.hero.description': '发现数百款可直接在浏览器中玩的免费游戏。无需下载，无需安装 - 即刻享受乐趣！',
    'home.featured': '精选游戏',
    'home.popular': '热门游戏',
    'home.recent': '最近添加',
    'home.explore': '探索游戏',
    'home.viewAll': '查看全部',
    
    // 游戏卡片
    'game.play': '立即玩',
    'game.info': '更多信息',
    'game.category': '分类',
    'game.rating': '评分',
    
    // 游戏类别
    'categories.originals': '原创游戏',
    'categories.multiplayer': '多人游戏',
    'categories.twoPlayer': '双人游戏',
    'categories.action': '动作游戏',
    'categories.adventure': '冒险游戏',
    'categories.basketball': '篮球',
    'categories.beauty': '美容游戏',
    'categories.bike': '自行车游戏',
    'categories.car': '汽车游戏',
    'categories.card': '卡牌游戏',
    'categories.casual': '休闲游戏',
    'categories.clicker': '点击游戏',
    'categories.controller': '控制器游戏',
    'categories.dressUp': '换装游戏',
    'categories.driving': '驾驶游戏',
    'categories.escape': '逃脱游戏',
    'categories.flash': 'Flash游戏',
    'categories.fps': '第一人称射击',
    'categories.horror': '恐怖游戏',
    
    // 通用
    'button.back': '返回',
    'button.next': '下一步',
    'loading': '加载中...',
    'error': '出错了',
    'settings': '设置',
    'language': '语言',
  },
  
  'ja': {
    // 导航
    'nav.home': 'ホーム',
    'nav.categories': 'カテゴリー',
    'nav.new': '新着ゲーム',
    'nav.trending': '人気',
    'nav.featured': 'おすすめ',
    'nav.updated': '更新済み',
    'nav.all': '全てのゲーム',
    'nav.search': 'ゲームを検索...',
    'nav.recent': '最近プレイしたゲーム',
    
    // 首页
    'home.hero.title': 'ゲームの世界',
    'home.hero.subtitle': '無限のエンターテイメント',
    'home.hero.description': 'ブラウザで直接プレイできる何百もの無料ゲームを発見しましょう。ダウンロード不要、インストール不要 - 今すぐ楽しもう！',
    'home.featured': 'おすすめゲーム',
    'home.popular': '人気ゲーム',
    'home.recent': '最近追加',
    'home.explore': 'ゲームを探す',
    'home.viewAll': '全て見る',
    
    // 游戏卡片
    'game.play': '今すぐプレイ',
    'game.info': '詳細情報',
    'game.category': 'カテゴリー',
    'game.rating': '評価',
    
    // 游戏类别
    'categories.originals': 'オリジナルゲーム',
    'categories.multiplayer': 'マルチプレイヤー',
    'categories.twoPlayer': '2人用ゲーム',
    'categories.action': 'アクションゲーム',
    'categories.adventure': 'アドベンチャーゲーム',
    'categories.basketball': 'バスケットボール',
    'categories.beauty': 'ビューティーゲーム',
    'categories.bike': '自転車ゲーム',
    'categories.car': '車ゲーム',
    'categories.card': 'カードゲーム',
    'categories.casual': 'カジュアルゲーム',
    'categories.clicker': 'クリッカーゲーム',
    'categories.controller': 'コントローラーゲーム',
    'categories.dressUp': '着せ替えゲーム',
    'categories.driving': 'ドライビングゲーム',
    'categories.escape': '脱出ゲーム',
    'categories.flash': 'フラッシュゲーム',
    'categories.fps': 'FPSゲーム',
    'categories.horror': 'ホラーゲーム',
    
    // 通用
    'button.back': '戻る',
    'button.next': '次へ',
    'loading': '読み込み中...',
    'error': 'エラーが発生しました',
    'settings': '設定',
    'language': '言語',
  },
  
  'ko': {
    // 导航
    'nav.home': '홈',
    'nav.categories': '카테고리',
    'nav.new': '새로운 게임',
    'nav.trending': '인기 게임',
    'nav.featured': '추천 게임',
    'nav.updated': '업데이트된 게임',
    'nav.all': '모든 게임',
    'nav.search': '게임 검색...',
    'nav.recent': '최근 플레이',
    
    // 首页
    'home.hero.title': '게임의 세계',
    'home.hero.subtitle': '무한한 즐거움',
    'home.hero.description': '브라우저에서 바로 플레이할 수 있는 수백 개의 무료 게임을 발견하세요. 다운로드나 설치 없이 - 즉시 즐기세요!',
    'home.featured': '추천 게임',
    'home.popular': '인기 게임',
    'home.recent': '최근 추가됨',
    'home.explore': '게임 탐색',
    'home.viewAll': '모두 보기',
    
    // 游戏卡片
    'game.play': '지금 플레이',
    'game.info': '더 많은 정보',
    'game.category': '카테고리',
    'game.rating': '평점',
    
    // 游戏类别
    'categories.originals': '오리지널 게임',
    'categories.multiplayer': '멀티플레이어',
    'categories.twoPlayer': '2인용 게임',
    'categories.action': '액션 게임',
    'categories.adventure': '어드벤처 게임',
    'categories.basketball': '농구',
    'categories.beauty': '뷰티 게임',
    'categories.bike': '자전거 게임',
    'categories.car': '자동차 게임',
    'categories.card': '카드 게임',
    'categories.casual': '캐주얼 게임',
    'categories.clicker': '클리커 게임',
    'categories.controller': '컨트롤러 게임',
    'categories.dressUp': '드레스업 게임',
    'categories.driving': '드라이빙 게임',
    'categories.escape': '탈출 게임',
    'categories.flash': '플래시 게임',
    'categories.fps': 'FPS 게임',
    'categories.horror': '공포 게임',
    
    // 通用
    'button.back': '뒤로',
    'button.next': '다음',
    'loading': '로딩 중...',
    'error': '문제가 발생했습니다',
    'settings': '설정',
    'language': '언어',
  },
  
  'es': {
    // 导航
    'nav.home': 'Inicio',
    'nav.categories': 'Categorías',
    'nav.new': 'Nuevos Juegos',
    'nav.trending': 'Tendencias',
    'nav.featured': 'Destacados',
    'nav.updated': 'Actualizados',
    'nav.all': 'Todos los Juegos',
    'nav.search': 'Buscar juegos...',
    'nav.recent': 'Jugados Recientemente',
    
    // 首页
    'home.hero.title': 'Mundo de Juegos',
    'home.hero.subtitle': 'Entretenimiento Sin Fin',
    'home.hero.description': 'Descubre cientos de juegos gratuitos para jugar directamente en tu navegador. Sin descargas, sin instalaciones - ¡diversión instantánea!',
    'home.featured': 'Juegos Destacados',
    'home.popular': 'Juegos Populares',
    'home.recent': 'Añadidos Recientemente',
    'home.explore': 'Explorar Juegos',
    'home.viewAll': 'Ver Todos',
    
    // 游戏卡片
    'game.play': 'Jugar Ahora',
    'game.info': 'Más Información',
    'game.category': 'Categoría',
    'game.rating': 'Calificación',
    
    // 游戏类别
    'categories.originals': 'Juegos Originales',
    'categories.multiplayer': 'Multijugador',
    'categories.twoPlayer': 'Juegos para 2',
    'categories.action': 'Juegos de Acción',
    'categories.adventure': 'Juegos de Aventura',
    'categories.basketball': 'Baloncesto',
    'categories.beauty': 'Juegos de Belleza',
    'categories.bike': 'Juegos de Bicicleta',
    'categories.car': 'Juegos de Coches',
    'categories.card': 'Juegos de Cartas',
    'categories.casual': 'Juegos Casuales',
    'categories.clicker': 'Juegos de Clicker',
    'categories.controller': 'Juegos con Mando',
    'categories.dressUp': 'Juegos de Vestir',
    'categories.driving': 'Juegos de Conducción',
    'categories.escape': 'Juegos de Escape',
    'categories.flash': 'Juegos Flash',
    'categories.fps': 'Juegos FPS',
    'categories.horror': 'Juegos de Terror',
    
    // 通用
    'button.back': 'Atrás',
    'button.next': 'Siguiente',
    'loading': 'Cargando...',
    'error': 'Algo salió mal',
    'settings': 'Configuración',
    'language': 'Idioma',
  },
  
  'fr': {
    // 导航
    'nav.home': 'Accueil',
    'nav.categories': 'Catégories',
    'nav.new': 'Nouveaux Jeux',
    'nav.trending': 'Tendances',
    'nav.featured': 'En Vedette',
    'nav.updated': 'Mis à Jour',
    'nav.all': 'Tous les Jeux',
    'nav.search': 'Rechercher des jeux...',
    'nav.recent': 'Joués Récemment',
    
    // 首页
    'home.hero.title': 'Monde des Jeux',
    'home.hero.subtitle': 'Divertissement Sans Fin',
    'home.hero.description': 'Découvrez des centaines de jeux gratuits à jouer directement dans votre navigateur. Pas de téléchargement, pas d\'installation - juste du plaisir instantané!',
    'home.featured': 'Jeux en Vedette',
    'home.popular': 'Jeux Populaires',
    'home.recent': 'Ajoutés Récemment',
    'home.explore': 'Explorer les Jeux',
    'home.viewAll': 'Voir Tout',
    
    // 游戏卡片
    'game.play': 'Jouer Maintenant',
    'game.info': 'Plus d\'Infos',
    'game.category': 'Catégorie',
    'game.rating': 'Évaluation',
    
    // 游戏类别
    'categories.originals': 'Jeux Originaux',
    'categories.multiplayer': 'Multijoueur',
    'categories.twoPlayer': 'Jeux à 2',
    'categories.action': 'Jeux d\'Action',
    'categories.adventure': 'Jeux d\'Aventure',
    'categories.basketball': 'Basketball',
    'categories.beauty': 'Jeux de Beauté',
    'categories.bike': 'Jeux de Vélo',
    'categories.car': 'Jeux de Voiture',
    'categories.card': 'Jeux de Cartes',
    'categories.casual': 'Jeux Casual',
    'categories.clicker': 'Jeux de Clicker',
    'categories.controller': 'Jeux à Manette',
    'categories.dressUp': 'Jeux d\'Habillage',
    'categories.driving': 'Jeux de Conduite',
    'categories.escape': 'Jeux d\'Évasion',
    'categories.flash': 'Jeux Flash',
    'categories.fps': 'Jeux FPS',
    'categories.horror': 'Jeux d\'Horreur',
    
    // 通用
    'button.back': 'Retour',
    'button.next': 'Suivant',
    'loading': 'Chargement...',
    'error': 'Une erreur est survenue',
    'settings': 'Paramètres',
    'language': 'Langue',
  },
  
  'de': {
    // 导航
    'nav.home': 'Startseite',
    'nav.categories': 'Kategorien',
    'nav.new': 'Neue Spiele',
    'nav.trending': 'Beliebt',
    'nav.featured': 'Empfohlen',
    'nav.updated': 'Aktualisiert',
    'nav.all': 'Alle Spiele',
    'nav.search': 'Spiele suchen...',
    'nav.recent': 'Kürzlich gespielt',
    
    // 首页
    'home.hero.title': 'Spielewelt',
    'home.hero.subtitle': 'Endlose Unterhaltung',
    'home.hero.description': 'Entdecke hunderte kostenlose Spiele, die du direkt in deinem Browser spielen kannst. Keine Downloads, keine Installationen - einfach sofort losspielen!',
    'home.featured': 'Empfohlene Spiele',
    'home.popular': 'Beliebte Spiele',
    'home.recent': 'Kürzlich hinzugefügt',
    'home.explore': 'Spiele erkunden',
    'home.viewAll': 'Alle anzeigen',
    
    // 游戏卡片
    'game.play': 'Jetzt spielen',
    'game.info': 'Mehr Infos',
    'game.category': 'Kategorie',
    'game.rating': 'Bewertung',
    
    // 游戏类别
    'categories.originals': 'Original-Spiele',
    'categories.multiplayer': 'Mehrspieler',
    'categories.twoPlayer': '2-Spieler-Spiele',
    'categories.action': 'Action-Spiele',
    'categories.adventure': 'Abenteuer-Spiele',
    'categories.basketball': 'Basketball',
    'categories.beauty': 'Beauty-Spiele',
    'categories.bike': 'Fahrrad-Spiele',
    'categories.car': 'Auto-Spiele',
    'categories.card': 'Kartenspiele',
    'categories.casual': 'Casual-Spiele',
    'categories.clicker': 'Clicker-Spiele',
    'categories.controller': 'Controller-Spiele',
    'categories.dressUp': 'Ankleidespiele',
    'categories.driving': 'Fahrspiele',
    'categories.escape': 'Escape-Spiele',
    'categories.flash': 'Flash-Spiele',
    'categories.fps': 'FPS-Spiele',
    'categories.horror': 'Horror-Spiele',
    
    // 通用
    'button.back': 'Zurück',
    'button.next': 'Weiter',
    'loading': 'Wird geladen...',
    'error': 'Etwas ist schiefgelaufen',
    'settings': 'Einstellungen',
    'language': 'Sprache',
  },
  
  'pt': {
    // 导航
    'nav.home': 'Início',
    'nav.categories': 'Categorias',
    'nav.new': 'Novos Jogos',
    'nav.trending': 'Em Alta',
    'nav.featured': 'Destaque',
    'nav.updated': 'Atualizados',
    'nav.all': 'Todos os Jogos',
    'nav.search': 'Pesquisar jogos...',
    'nav.recent': 'Jogados Recentemente',
    
    // 首页
    'home.hero.title': 'Mundo dos Jogos',
    'home.hero.subtitle': 'Entretenimento Sem Fim',
    'home.hero.description': 'Descubra centenas de jogos gratuitos para jogar diretamente no seu navegador. Sem downloads, sem instalações - apenas diversão instantânea!',
    'home.featured': 'Jogos em Destaque',
    'home.popular': 'Jogos Populares',
    'home.recent': 'Adicionados Recentemente',
    'home.explore': 'Explorar Jogos',
    'home.viewAll': 'Ver Todos',
    
    // 游戏卡片
    'game.play': 'Jogar Agora',
    'game.info': 'Mais Informações',
    'game.category': 'Categoria',
    'game.rating': 'Avaliação',
    
    // 游戏类别
    'categories.originals': 'Jogos Originais',
    'categories.multiplayer': 'Multijogador',
    'categories.twoPlayer': 'Jogos para 2',
    'categories.action': 'Jogos de Ação',
    'categories.adventure': 'Jogos de Aventura',
    'categories.basketball': 'Basquete',
    'categories.beauty': 'Jogos de Beleza',
    'categories.bike': 'Jogos de Bicicleta',
    'categories.car': 'Jogos de Carro',
    'categories.card': 'Jogos de Cartas',
    'categories.casual': 'Jogos Casuais',
    'categories.clicker': 'Jogos de Clicker',
    'categories.controller': 'Jogos com Controle',
    'categories.dressUp': 'Jogos de Vestir',
    'categories.driving': 'Jogos de Direção',
    'categories.escape': 'Jogos de Fuga',
    'categories.flash': 'Jogos Flash',
    'categories.fps': 'Jogos FPS',
    'categories.horror': 'Jogos de Terror',
    
    // 通用
    'button.back': 'Voltar',
    'button.next': 'Próximo',
    'loading': 'Carregando...',
    'error': 'Algo deu errado',
    'settings': 'Configurações',
    'language': 'Idioma',
  },
  
  'ru': {
    // 导航
    'nav.home': 'Главная',
    'nav.categories': 'Категории',
    'nav.new': 'Новые игры',
    'nav.trending': 'Популярные',
    'nav.featured': 'Рекомендуемые',
    'nav.updated': 'Обновленные',
    'nav.all': 'Все игры',
    'nav.search': 'Поиск игр...',
    'nav.recent': 'Недавно сыгранные',
    
    // 首页
    'home.hero.title': 'Мир игр',
    'home.hero.subtitle': 'Бесконечные развлечения',
    'home.hero.description': 'Откройте для себя сотни бесплатных игр, в которые можно играть прямо в браузере. Без загрузок, без установок - просто мгновенное веселье!',
    'home.featured': 'Рекомендуемые игры',
    'home.popular': 'Популярные игры',
    'home.recent': 'Недавно добавленные',
    'home.explore': 'Исследовать игры',
    'home.viewAll': 'Смотреть все',
    
    // 游戏卡片
    'game.play': 'Играть сейчас',
    'game.info': 'Подробнее',
    'game.category': 'Категория',
    'game.rating': 'Рейтинг',
    
    // 游戏类别
    'categories.originals': 'Оригинальные игры',
    'categories.multiplayer': 'Многопользовательские',
    'categories.twoPlayer': 'Игры для двоих',
    'categories.action': 'Экшн-игры',
    'categories.adventure': 'Приключенческие игры',
    'categories.basketball': 'Баскетбол',
    'categories.beauty': 'Игры красоты',
    'categories.bike': 'Велосипедные игры',
    'categories.car': 'Автомобильные игры',
    'categories.card': 'Карточные игры',
    'categories.casual': 'Казуальные игры',
    'categories.clicker': 'Кликеры',
    'categories.controller': 'Игры с контроллером',
    'categories.dressUp': 'Игры одевалки',
    'categories.driving': 'Игры вождения',
    'categories.escape': 'Игры побега',
    'categories.flash': 'Флеш-игры',
    'categories.fps': 'FPS-игры',
    'categories.horror': 'Игры ужасов',
    
    // 通用
    'button.back': 'Назад',
    'button.next': 'Далее',
    'loading': 'Загрузка...',
    'error': 'Что-то пошло не так',
    'settings': 'Настройки',
    'language': 'Язык',
  },
  
  'it': {
    // 导航
    'nav.home': 'Home',
    'nav.categories': 'Categorie',
    'nav.new': 'Nuovi Giochi',
    'nav.trending': 'Di Tendenza',
    'nav.featured': 'In Evidenza',
    'nav.updated': 'Aggiornati',
    'nav.all': 'Tutti i Giochi',
    'nav.search': 'Cerca giochi...',
    'nav.recent': 'Giocati di Recente',
    
    // 首页
    'home.hero.title': 'Mondo dei Giochi',
    'home.hero.subtitle': 'Intrattenimento Senza Fine',
    'home.hero.description': 'Scopri centinaia di giochi gratuiti da giocare direttamente nel tuo browser. Nessun download, nessuna installazione - solo divertimento istantaneo!',
    'home.featured': 'Giochi in Evidenza',
    'home.popular': 'Giochi Popolari',
    'home.recent': 'Aggiunti di Recente',
    'home.explore': 'Esplora i Giochi',
    'home.viewAll': 'Vedi Tutti',
    
    // 游戏卡片
    'game.play': 'Gioca Ora',
    'game.info': 'Più Informazioni',
    'game.category': 'Categoria',
    'game.rating': 'Valutazione',
    
    // 游戏类别
    'categories.originals': 'Giochi Originali',
    'categories.multiplayer': 'Multigiocatore',
    'categories.twoPlayer': 'Giochi per 2',
    'categories.action': 'Giochi d\'Azione',
    'categories.adventure': 'Giochi d\'Avventura',
    'categories.basketball': 'Basket',
    'categories.beauty': 'Giochi di Bellezza',
    'categories.bike': 'Giochi di Bicicletta',
    'categories.car': 'Giochi di Auto',
    'categories.card': 'Giochi di Carte',
    'categories.casual': 'Giochi Casual',
    'categories.clicker': 'Giochi Clicker',
    'categories.controller': 'Giochi con Controller',
    'categories.dressUp': 'Giochi di Vestire',
    'categories.driving': 'Giochi di Guida',
    'categories.escape': 'Giochi di Fuga',
    'categories.flash': 'Giochi Flash',
    'categories.fps': 'Giochi FPS',
    'categories.horror': 'Giochi Horror',
    
    // 通用
    'button.back': 'Indietro',
    'button.next': 'Avanti',
    'loading': 'Caricamento...',
    'error': 'Qualcosa è andato storto',
    'settings': 'Impostazioni',
    'language': 'Lingua',
  },
};

// 添加更多翻译...

// 获取翻译
export function getTranslation(key: string, locale: string = defaultLocale): string {
  // 确保使用有效的语言代码
  if (!translations[locale]) {
    console.warn(`Translation not found for locale: ${locale}, falling back to default locale: ${defaultLocale}`);
    return translations[defaultLocale][key] || key;
  }
  
  // 确保翻译键存在
  if (!translations[locale][key]) {
    // 如果当前语言没有该翻译，则使用默认语言
    console.warn(`Translation key not found: ${key} in locale: ${locale}, falling back to default locale`);
    return translations[defaultLocale][key] || key;
  }
  
  return translations[locale][key];
}

// 翻译函数
export function createTranslator(locale: string) {
  return (key: string): string => getTranslation(key, locale);
} 