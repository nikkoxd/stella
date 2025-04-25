# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.4.3](https://github.com/nikkoxd/stella/compare/v2.4.2...v2.4.3) (2024-06-03)


### Bug Fixes

* :bug: print out the message object properly ([6018505](https://github.com/nikkoxd/stella/commit/60185057076817ffbcda39c59091b8e10960d1f8))
* :loud_sound: add a bit more logs ([71c84ef](https://github.com/nikkoxd/stella/commit/71c84ef7c626f8b16996e88bac842740dada641b))
* :loud_sound: add command logs ([d9fcadd](https://github.com/nikkoxd/stella/commit/d9fcadd73cd02713f3987cd6e42c4c55cd92d81e))
* :loud_sound: add logs ([49c27c0](https://github.com/nikkoxd/stella/commit/49c27c00abe687735244631d16d4bf87b5a21c07))
* :loud_sound: add more interaction logs ([0b78945](https://github.com/nikkoxd/stella/commit/0b78945bf3c5c49129d490902bdc1d34700350f0))
* :loud_sound: fix logs ([f9976ff](https://github.com/nikkoxd/stella/commit/f9976ffdb40da4a5c57a91d1a42ef13bbf190a13))
* **listeners:** :bug: do not process system messages ([1a082d0](https://github.com/nikkoxd/stella/commit/1a082d0f27f3177fe96c5acac4d9e08abde1ada0))
* **listeners:** :bug: fix bump command not being processed ([712cd34](https://github.com/nikkoxd/stella/commit/712cd34c689870b1abff5ff7e50b3713845f00c2))
* **listeners:** :bug: fix bump replies not being read properly ([d4b36c0](https://github.com/nikkoxd/stella/commit/d4b36c0cfd3cb40def13685b4efa2b6b28abcf60))
* **listeners:** :bug: fix cooldowns ([5ca7e6d](https://github.com/nikkoxd/stella/commit/5ca7e6d3f7e6bff94dfa58e56dc6cd5b1dc344ee))
* **listeners:** :bug: fix message listener using the wrong member ids ([685ba84](https://github.com/nikkoxd/stella/commit/685ba841ee9a0deeba9195827730f3e85396dfdc))
* **listeners:** :bug: fix regex checking, don't check embeds on /up ([4af9fd8](https://github.com/nikkoxd/stella/commit/4af9fd8230a0fdc41adc4b658bc5aa6f79182cfd))
* **listeners:** :bug: rewrite the logic for getting bump reply messages ([5ce80e3](https://github.com/nikkoxd/stella/commit/5ce80e3c78a3e12a3cfa9931f52c6d6087535151))
* **listeners:** :bug: use GuildMember.edit to add roles on join ([b669f07](https://github.com/nikkoxd/stella/commit/b669f079359d3925ac26a0516e9d02440826b524))
* **listeners:** :bug: use proper javascript regexp formatting ([8fa07ae](https://github.com/nikkoxd/stella/commit/8fa07ae8662811fbdba7ae42129f7ca772627aa7))
* **listeners:** :loud_sound: add logs for testing ([5e0b9bc](https://github.com/nikkoxd/stella/commit/5e0b9bc9da5187d05bfde9845ef6e8904f872f70))
* **listeners:** :loud_sound: add logs on every application command in bumps channel ([3b06f72](https://github.com/nikkoxd/stella/commit/3b06f725c003e435dc699a3bcfe827ffd2e261cd))

## [2.4.2](https://github.com/nikkoxd/stella/compare/v2.4.1...v2.4.2) (2024-04-22)


### Bug Fixes

* change attachments directory ([bbfe807](https://github.com/nikkoxd/stella/commit/bbfe80756284c23d62cc62ee29fe64b054988fe2))
* **listeners:** :construction: temporarily disable rewards for /bump ([4a10b20](https://github.com/nikkoxd/stella/commit/4a10b20bbb60117ca5502978d78771afda315727))
* **listeners:** :loud_sound: add interaction logs ([96f434b](https://github.com/nikkoxd/stella/commit/96f434bbb9aae03704a937ce7031ee406b68d177))

## [2.4.1](https://github.com/nikkoxd/stella/compare/v2.4.0...v2.4.1) (2024-03-11)


### Bug Fixes

* **listeners:** :loud_sound: add logs to bump rewards ([abd2b06](https://github.com/nikkoxd/stella/commit/abd2b06ae7deeb45c24fe110142557639a12f113))

## [2.4.0](https://github.com/nikkoxd/stella/compare/v2.3.0...v2.4.0) (2024-03-11)


### Features

* **handlers:** :sparkles: add command cooldown checks ([285a31e](https://github.com/nikkoxd/stella/commit/285a31e32aa33d95255c955f8cb037297d325238))
* **listeners:** :sparkles: add cooldowns for bumps ([93d9f48](https://github.com/nikkoxd/stella/commit/93d9f48281cbf2d3d5371ab3f12c26b9499b4346))


### Bug Fixes

* :ambulance: wait for mongodb to load before doing anything else ([77bbfd0](https://github.com/nikkoxd/stella/commit/77bbfd0b9c91280ed4c40d728adb36cc64db8bde))
* **config:** :ambulance: convert string type to number where needed ([4a6dd7d](https://github.com/nikkoxd/stella/commit/4a6dd7d0c7a49c22efe00a6b4c86ca829c747283))
* **types:** :art: move scheduler to container ([2a2174c](https://github.com/nikkoxd/stella/commit/2a2174cbf896e155e0e04b675e0d240a78e71973))

## [2.3.0](https://github.com/nikkoxd/stella/compare/v2.2.0...v2.3.0) (2024-03-09)


### Features

* :technologist: add types for env vars ([5863481](https://github.com/nikkoxd/stella/commit/5863481f896f89319913b27997ad6a8e08f40204))


### Bug Fixes

* :fire: remove error-handler.ts ([6f87c31](https://github.com/nikkoxd/stella/commit/6f87c31b0616cdad8b16c1d557cbb41b83bbbdb8))
* **handlers:** :ambulance: replace logError with the new method ([c61ac07](https://github.com/nikkoxd/stella/commit/c61ac07ca98e3a14831082c07864026e33046ab4))

## [2.2.0](https://github.com/nikkoxd/stella/compare/v2.1.0...v2.2.0) (2024-03-08)


### Features

* **handlers:** :sparkles: add functionality for adding new mods ([2dd4389](https://github.com/nikkoxd/stella/commit/2dd4389d956c8d49e0c51e4d1ad97607afe29833))

## [2.1.0](https://github.com/nikkoxd/stella/compare/v2.0.1...v2.1.0) (2024-03-08)


### Features

* **give:** :loud_sound: add logs ([c76061d](https://github.com/nikkoxd/stella/commit/c76061de4828816137a7dc33c295a041637c6d10))

## [2.0.1](https://github.com/nikkoxd/stella/compare/v2.0.0...v2.0.1) (2024-03-08)


### Bug Fixes

* :heavy_plus_sign: replace standard-version with release-please ([5b6e840](https://github.com/nikkoxd/stella/commit/5b6e840d71eed02676a910f372525a22571a87cf))
* **actions:** :bug: update the token name ([ea4649f](https://github.com/nikkoxd/stella/commit/ea4649f55fe7bb37947cefd44a4311fa7dbc7dfc))

## 2.0.0 (2024-03-08)


### ⚠ BREAKING CHANGES

* This project now uses mongoose instead of clean mongodb to ease the coding experience
* This project now uses mongoose instead of clean mongodb to ease the coding experience

### Features

* :sparkles: add a logger ([ffc7fed](https://github.com/nikkoxd/stella/commit/ffc7fed1a3b6ca1506ce947b30e5524d2b7d78f1))
* add a channel rent button handler ([2cb2f6a](https://github.com/nikkoxd/stella/commit/2cb2f6ade4ef837ffd17d4b0f615af8e94484fa6))
* add ability to edit id hints from env ([357e8f8](https://github.com/nikkoxd/stella/commit/357e8f81d59ba9290f3795d139ae6073f9554bd6))
* add ability to set custom status ([7fb9ba7](https://github.com/nikkoxd/stella/commit/7fb9ba774ace4e5220df1db81c8ceacfc7b44157))
* add balance command ([db8ef63](https://github.com/nikkoxd/stella/commit/db8ef63d78b122eff250130aec4a539336ab05a3))
* add balance command ([ff391ee](https://github.com/nikkoxd/stella/commit/ff391ee8a598c12c45f595d0b4e2fcf52dfc47e4))
* add balance-set command ([66d5084](https://github.com/nikkoxd/stella/commit/66d50848cf3590bca8644df08c3c6ed5b212842a))
* add balance-set command ([d2603aa](https://github.com/nikkoxd/stella/commit/d2603aaa7df5d42d06cf048cbb8214d80e6c9a67))
* add balance-top command ([62a239f](https://github.com/nikkoxd/stella/commit/62a239f7d92f9c097dc4162662689ba808df1b93))
* add balance-top command ([8f7890b](https://github.com/nikkoxd/stella/commit/8f7890bacb7fa60b34672d18419dbeaba41e1290))
* add behaviour for deleting expired rooms ([788410f](https://github.com/nikkoxd/stella/commit/788410f51826a3622c493b7fa870a0423b4301bd))
* add coins for each message sent ([1a3a670](https://github.com/nikkoxd/stella/commit/1a3a67053879aac78478dd973048dca60ee88edc))
* add coins for each message sent ([a57cf87](https://github.com/nikkoxd/stella/commit/a57cf87ec4f7e0eebc10ea9b0313b96a69227814))
* add config command ([6c66a71](https://github.com/nikkoxd/stella/commit/6c66a7149ce65ea9c5793d41f4f6e3496e36b2d5))
* add cooldowns for giving coins ([828f26c](https://github.com/nikkoxd/stella/commit/828f26c5f1e7281f666932f01806d93e38657413))
* add cooldowns for giving coins ([20c129d](https://github.com/nikkoxd/stella/commit/20c129d4e1cacb91d211cdafebcf400135197390))
* add english translations ([edd1edc](https://github.com/nikkoxd/stella/commit/edd1edcf65f20c3c846c07f4d41bf44d7bca7189))
* add exp and level to member schema ([2171975](https://github.com/nikkoxd/stella/commit/2171975393d7feba809d00c16b6f7f02e4637404))
* add exp object to guild schema containing experience system config ([b717b54](https://github.com/nikkoxd/stella/commit/b717b5414632059b73c19ad59674d768233b3070))
* add give command for giving coins/exp ([618b255](https://github.com/nikkoxd/stella/commit/618b25550806c5a8d26bba8bf48334189f6d5fcf))
* add leaderboard command ([c6f0d5f](https://github.com/nikkoxd/stella/commit/c6f0d5f27d72c8b8f2293d7a7ed1f74243aadf99))
* add member option to /balance and /rank commands ([9eb626b](https://github.com/nikkoxd/stella/commit/9eb626bcde23e21bbf8861a82896aaf9c1bad1cc))
* add member schema ([f3c33ea](https://github.com/nikkoxd/stella/commit/f3c33ea3e4f696226c8ab328097e464fc8d69697))
* add member schema ([9241adf](https://github.com/nikkoxd/stella/commit/9241adf4e0e3886e946ca15491be622b612d66d2))
* add message model ([42c6d20](https://github.com/nikkoxd/stella/commit/42c6d20598bd34268bf3a0cc235eb7ccf56dcc1d))
* add message model ([b2d3a15](https://github.com/nikkoxd/stella/commit/b2d3a1532a254dcc51c91aaf81a11052107f3ccc))
* add message schema ([2dc046f](https://github.com/nikkoxd/stella/commit/2dc046f83d4b0968c04cbe1a4dcba8d64cd72c20))
* add message schema ([7d1e4e3](https://github.com/nikkoxd/stella/commit/7d1e4e3e6f7b168230a73d04dfaf0a5a3caff451))
* add mongodb support ([92ad3fe](https://github.com/nikkoxd/stella/commit/92ad3febf17327163bbaaa51ad77f25c7dcafa13))
* add mongodb support ([1907fb5](https://github.com/nikkoxd/stella/commit/1907fb5618a06b85a9990755a06fa9ca6e4088f5))
* add pagination to the shop ([ab4d420](https://github.com/nikkoxd/stella/commit/ab4d42021ecff9895339b9cce4ad641e5bc52af1))
* add price to each role select option ([c70d3b0](https://github.com/nikkoxd/stella/commit/c70d3b03397b7bb818bd3f54fcecdb69e4a0c1ff))
* add private rooms configuration ([2de3fc8](https://github.com/nikkoxd/stella/commit/2de3fc8b9bc6e24aa4521cd4b82bf683b1ac7ef9))
* add rank command ([8099f18](https://github.com/nikkoxd/stella/commit/8099f188403f0bc62bb2d8122642457372bc19da))
* add roles when reaching certain levels ([2fe4908](https://github.com/nikkoxd/stella/commit/2fe49080f8bed94058d9cac49423ab9baa88b693))
* add roles when setting level/exp ([f87ddc5](https://github.com/nikkoxd/stella/commit/f87ddc5fac61f5383ccd77f9e935590228d318ca))
* add set command ([4cf6334](https://github.com/nikkoxd/stella/commit/4cf6334241f23caca25eb2e971b4bb367272307c))
* add shop ([9a51aff](https://github.com/nikkoxd/stella/commit/9a51affe6b749e4af393ea1553bd2b475d520e46))
* add shop ([966c73d](https://github.com/nikkoxd/stella/commit/966c73deca54e32eab2e0fb50322990a30abdbff))
* add shop message ([305ebc5](https://github.com/nikkoxd/stella/commit/305ebc56d6fee1ef7d7d1b4641cc2d6f3acdedb6))
* added polls ([39962aa](https://github.com/nikkoxd/stella/commit/39962aae716f2b6e57dbb423c953cb0509fd4ebe))
* **commands:** :loud_sound: add logs for config command ([d29df31](https://github.com/nikkoxd/stella/commit/d29df31d18b159479ee3e3c806c997c0884757dd))
* **commands:** :sparkles: replace exp-config with reward add/remove ([bdaa596](https://github.com/nikkoxd/stella/commit/bdaa59698b7f6a2719ca32bff4771dad824107c5))
* **commands:** :sparkles: reward members for using bump commands ([071a5b9](https://github.com/nikkoxd/stella/commit/071a5b964e6d6799fc7faec597231f290ce24333))
* disable buttons on collector end ([6036b5e](https://github.com/nikkoxd/stella/commit/6036b5e27ea6c8371b13d4622379e88dc8d203b1))
* embed colors are now customizable ([a8baf64](https://github.com/nikkoxd/stella/commit/a8baf64f8840a2ce5ada18ab1c3d48bc067cab56))
* embed colors are now customizable ([a617c2a](https://github.com/nikkoxd/stella/commit/a617c2a08e3ae06f73a20c6836aad93732da1259))
* enable failed attachment reply ([63a3d83](https://github.com/nikkoxd/stella/commit/63a3d832112e3af00bcceb2e994064e6d9dcd2c1))
* export logError from index ([594a893](https://github.com/nikkoxd/stella/commit/594a893a5e27b207678e3c956659d0f47ceb8e1a))
* export logError from index ([54b4c1d](https://github.com/nikkoxd/stella/commit/54b4c1d135d2c61d50d0c64aba7d8eb64b850266))
* get messages from db ([5662728](https://github.com/nikkoxd/stella/commit/56627288533d77dcd52cb2d643a0d39da163f655))
* get messages from db ([94154f6](https://github.com/nikkoxd/stella/commit/94154f62967ac97223401122ab742e8b0314527f))
* give a role upon join ([af8f2e0](https://github.com/nikkoxd/stella/commit/af8f2e092712cb637a5033105447ff05716652ac))
* if verification is enabled, only ping when member accepts rules ([8bdaa49](https://github.com/nikkoxd/stella/commit/8bdaa4945f2a8c787f173a57560dc5528b0b5edf))
* make interaction parameter optional ([7746f7e](https://github.com/nikkoxd/stella/commit/7746f7e9a587f93125fb0e25e417e864c13c16ec))
* make interaction parameter optional ([ae6c8fc](https://github.com/nikkoxd/stella/commit/ae6c8fc077f2eb1aaaece27fdeabb56baa211060))
* make private rooms when joining a certain channel ([ed1d5ac](https://github.com/nikkoxd/stella/commit/ed1d5ac9ca93a7c10c56e45ea0dd6a5708dddb4f))
* move mongodb code to an external service ([36547d1](https://github.com/nikkoxd/stella/commit/36547d1d30c63d080830e9f23203a0c07148aa2f))
* move mongodb code to an external service ([4592b7d](https://github.com/nikkoxd/stella/commit/4592b7d0e0d3d3f7af65cfcd32bf3c2340afbaca))
* proccess room options ([d3f838b](https://github.com/nikkoxd/stella/commit/d3f838bf5d4bf02f4c4cbaa78da162e5100c23c2))
* react to messages mentioning [@everyone](https://github.com/everyone) ([1e17322](https://github.com/nikkoxd/stella/commit/1e17322ff45bab859c3bada6fffa7fdcd9c1e74c))
* reply to failed embed tenor.com links ([163f02c](https://github.com/nikkoxd/stella/commit/163f02c9e0319ea3134483628919e0b9c1417696))
* send a message with expiry date when renting a channel ([3b198f6](https://github.com/nikkoxd/stella/commit/3b198f62f74f9a1a9fae77d5898139132448e38d))
* show balance inside shop ([b24690e](https://github.com/nikkoxd/stella/commit/b24690eff8b85d1dec95b91f0c038359c90b5929))
* update config ([a817655](https://github.com/nikkoxd/stella/commit/a8176551f9d297973df188b159f98e729e2acd28))
* update default status ([ae3e70e](https://github.com/nikkoxd/stella/commit/ae3e70e0b761cb0494bd0c9429410715cd0abda6))
* update poll design ([1206d6f](https://github.com/nikkoxd/stella/commit/1206d6f0b09e9210ebaa5768dcb05cf4f2346cd1))
* use mongoose instead of clean mongo ([b410a96](https://github.com/nikkoxd/stella/commit/b410a9688a8454210991dbc29f78baebe6099093))
* use mongoose instead of clean mongo ([623658c](https://github.com/nikkoxd/stella/commit/623658cffa87787de3303f33ae2cbc204993b2ab))


### Bug Fixes

* :ambulance: only remove roles from db if they don't exist on member ([b981b12](https://github.com/nikkoxd/stella/commit/b981b1261347488ced4269d01aae51cd3ddfea31))
* :ambulance: removed LOG_CHANNEL from required env vars ([c2f48ca](https://github.com/nikkoxd/stella/commit/c2f48ca3791f08954f1960e1b845e7ff519f7b64))
* :children_crossing: check for env vars on startup ([5d71bf3](https://github.com/nikkoxd/stella/commit/5d71bf391b16f83ccd96157e64d0ea7ca72f7aba))
* add a check for existing member roles ([0d73e40](https://github.com/nikkoxd/stella/commit/0d73e4070cacbb42593ce2e5dc0fa5388b234ec4))
* add balance id hint to .env ([4fde334](https://github.com/nikkoxd/stella/commit/4fde334d1c8ea170bf8ee7e684bff46b23246482))
* add balance id hint to .env ([ac8e9ca](https://github.com/nikkoxd/stella/commit/ac8e9cae2a35c8386208add183104be58831510b))
* add config for adding roles (temporary) ([6f281af](https://github.com/nikkoxd/stella/commit/6f281af1846f0615ce0ffeaefd1c3ab23707067b))
* add default permissions for polls ([7abe1b7](https://github.com/nikkoxd/stella/commit/7abe1b7f03c4495b0dce23063b9145abb341e4a8))
* add GuildVoiceStates intent ([805d0fe](https://github.com/nikkoxd/stella/commit/805d0fe024568d8a3cc0ccdefc66f61a32eb9f03))
* add missing translations ([06e4f1c](https://github.com/nikkoxd/stella/commit/06e4f1ce9583e4845b89e434f13be90eae6c2b89))
* add missing translations ([526737e](https://github.com/nikkoxd/stella/commit/526737edb1dc032616c48ee4a98139fa6b03a65d))
* add missing translations for economy commands ([6785e89](https://github.com/nikkoxd/stella/commit/6785e89d1ab0948b793d154766284589ee77c516))
* add more interaction types for logging errors ([f80a0ba](https://github.com/nikkoxd/stella/commit/f80a0bab51fef586f1ee493e66c29d92ab64c584))
* add rooms translations ([d47fd0f](https://github.com/nikkoxd/stella/commit/d47fd0fe1c3b36dfb336168c21281e2db18685d1))
* add translations ([a6b46ca](https://github.com/nikkoxd/stella/commit/a6b46ca5a00bdcc6d667e0c7c4b71fb5e1020e99))
* add translations ([79e765d](https://github.com/nikkoxd/stella/commit/79e765d9dc8b04acff265399123f819dc1f345d9))
* add translations ([41cd68b](https://github.com/nikkoxd/stella/commit/41cd68bf420779287521a117a63fb725c3c0ef9f))
* add translations ([3dbf418](https://github.com/nikkoxd/stella/commit/3dbf41894a120ceef17bebe727045695f4128697))
* add vscode project settings to .gitignore ([57d7e4b](https://github.com/nikkoxd/stella/commit/57d7e4b51a29d43cc6b62b11c50c3d4e3d8624f7))
* add vscode project settings to .gitignore ([3880e10](https://github.com/nikkoxd/stella/commit/3880e100fa621105cbb92d1e923cef32e079ade6))
* balance-set now requires manage messages perms ([b59a82d](https://github.com/nikkoxd/stella/commit/b59a82dad915512dd8720e740affd94933b6d1fb))
* balance-set now requires manage messages perms ([ee8c7cd](https://github.com/nikkoxd/stella/commit/ee8c7cd7bd1f03ac77a73874ecdd389f211a1208))
* ci fails because of wrong lockfile version ([e17f318](https://github.com/nikkoxd/stella/commit/e17f318590c3b3107631da3ece0d37e764f20473))
* **commands:** :ambulance: add missing params ([b9a009a](https://github.com/nikkoxd/stella/commit/b9a009a18b4e192c08e7422f43bfbc72cbdaffe4))
* **commands:** :poop: disable replies until a way of detecting if the command is on cooldown is implemented ([a1b6459](https://github.com/nikkoxd/stella/commit/a1b645981d3bb2e315532d1a4195c1159fe622ab))
* create database based on guild id ([d04a2fa](https://github.com/nikkoxd/stella/commit/d04a2faee6ceefdcb11058e012e00e1fcbd8d499))
* disable pagination for now to not cause errors ([13e14c2](https://github.com/nikkoxd/stella/commit/13e14c20c45e53a275fddcd33c2ecee7c07cb3c5))
* edit values for exp config ([e5c0b94](https://github.com/nikkoxd/stella/commit/e5c0b94640e1dbbff451ea06210f052cf450f637))
* export database from index.ts ([511ac7b](https://github.com/nikkoxd/stella/commit/511ac7bb6e0ac714a1f45ca6d2ea02e93ef33ed0))
* export database from index.ts ([eb6e9ef](https://github.com/nikkoxd/stella/commit/eb6e9efcb599a4f80cae15b2d74dba305f524498))
* fix poll results ([6e7b24d](https://github.com/nikkoxd/stella/commit/6e7b24dd0ff9a15f77a49b1e9d4c82242da89653))
* give proper role rewards ([419adc4](https://github.com/nikkoxd/stella/commit/419adc47ef3850d4ae9b99e459f8bc1fa1ea4966))
* ignore .DS_Store file ([4fb61e0](https://github.com/nikkoxd/stella/commit/4fb61e09c2a222e815552b0e447bf2a758728453))
* make exp, level and coins required ([720956d](https://github.com/nikkoxd/stella/commit/720956db933f35d5eb54318bddf63773c0c97e76))
* make set-balance replies ephermal ([00351d4](https://github.com/nikkoxd/stella/commit/00351d4bde7983e1fb1d4955d6b1bd2ff123d2ce))
* messages w/o attachments crash the app ([bb57e9a](https://github.com/nikkoxd/stella/commit/bb57e9a72516c0558f69df03edecb071be72dc34))
* move attachments variable to prevent crashes ([24394cd](https://github.com/nikkoxd/stella/commit/24394cd813544ed3351e9ef89f7dd84e29cb5049))
* move cooldowns from index to messageCreate ([72090d3](https://github.com/nikkoxd/stella/commit/72090d37972d3dd3befb81c45003b20414a62f63))
* move the calculateLevel() method ([9a9ef28](https://github.com/nikkoxd/stella/commit/9a9ef28bb5a18cf56fe6a742a1ef09721bdc9491))
* no need for exporting interfaces ([44fd4ac](https://github.com/nikkoxd/stella/commit/44fd4ac4769d0b86d6489aa79ff410f318c5fee7))
* no need for exporting interfaces ([5b288ac](https://github.com/nikkoxd/stella/commit/5b288acf2dc77d0c701b3d4e6046ecc63b9c3039))
* only add button row if there is more than 1 page ([fb1791c](https://github.com/nikkoxd/stella/commit/fb1791cb99609ac7c7a18d76d938bc4bee4b124c))
* only try to delete roles if member has them ([8ce0c63](https://github.com/nikkoxd/stella/commit/8ce0c633a2d68164a206e004cdb69f60bae2c36e))
* optimize rewarding roles ([0a6cd2a](https://github.com/nikkoxd/stella/commit/0a6cd2a5fa4e6fb059249241e4b70725a76d650e))
* optimize some code ([7e1d64b](https://github.com/nikkoxd/stella/commit/7e1d64b1e5ea42140685acbe751b4c76829af169))
* remove addcomponent command ([a4800ad](https://github.com/nikkoxd/stella/commit/a4800add5d2c87dd35215526abc5708d2f076027))
* remove duplicate code ([d9f090e](https://github.com/nikkoxd/stella/commit/d9f090e67079e34d9cae1284953786e2c43ecfe8))
* remove message files and move attachments to a different folder ([ef722b9](https://github.com/nikkoxd/stella/commit/ef722b9191595d1212a67cdd5a71320f8fbe870c))
* remove message files and move attachments to a different folder ([c7113fe](https://github.com/nikkoxd/stella/commit/c7113feab1cf78b10a8e186b5ecd16986478037f))
* remove unused line in .env ([aa22eee](https://github.com/nikkoxd/stella/commit/aa22eee667b528d815f6da55bf3382e074248657))
* rename the fields key ([9cc9654](https://github.com/nikkoxd/stella/commit/9cc965442a49edaf87cd3a5525db4f7113f241d2))
* replace cleanupcommands with command-remove ([24a04c1](https://github.com/nikkoxd/stella/commit/24a04c1de9bf45cd503953f0ba80f773807be40a))
* revert "chore: remove unused commands" ([791b3c9](https://github.com/nikkoxd/stella/commit/791b3c9a9fd1af40dcabb9421b1acca1039f9a7a))
* sort roles by price ([d17a502](https://github.com/nikkoxd/stella/commit/d17a502169b1cbfcdaa4e424b6420c195a20ebbc))
* swap interaction and err parameters ([66d4e75](https://github.com/nikkoxd/stella/commit/66d4e75750aa61b33da8e8b6d9fd692b960e73f6))
* swap interaction and err parameters ([9b1b75d](https://github.com/nikkoxd/stella/commit/9b1b75d1e7a5ff7ef424551804573bf0a757fc72))
* update .env example ([1c7bc82](https://github.com/nikkoxd/stella/commit/1c7bc82dcf523c54b931af527dbc3b11f1146e3f))
* update message listener to also react to [@here](https://github.com/here) mentions ([67c2de5](https://github.com/nikkoxd/stella/commit/67c2de59e8511d371503211f66c43336b4006cfa))
* update ping reply formatting ([9a40eef](https://github.com/nikkoxd/stella/commit/9a40eef9f73a9880cf50ee00f0791608508ae681))
* use embed color from db ([8af32b2](https://github.com/nikkoxd/stella/commit/8af32b2d74948992ab5bf2308decfc35232549f4))
* use the full i18next.t function ([4b99507](https://github.com/nikkoxd/stella/commit/4b99507c3fe75ebe4b0f3f99bb37f07da471e698))
* wait for i18next to initialize then login to discord api ([20b68e1](https://github.com/nikkoxd/stella/commit/20b68e1928695e6b40e3f478f8e8efea091e0578))
* wrong file version chosen for merge ([5a07707](https://github.com/nikkoxd/stella/commit/5a077076e1d11606327566c327876479a21eff87))
