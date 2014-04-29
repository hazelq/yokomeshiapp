'use strict';

/* Controllers */

var hiraganaApp = angular.module('hiraganaApp', []);

hiraganaApp.controller('CardListCtrl', ['$scope', '$http', 
	function ($scope, $http) {
		var counter = 0, startTime = 0, endTime = 0, totalTime = 0;

		$http.get('cards/hiragana.json').success( function(data) {
			$scope.cards = data;
			startTime = new Date();
		
			$scope.cards = shuffleCards($scope.cards);
			$scope.guessCard = randomCard($scope.cards);
			counter = $scope.cards.length;
		});

		$scope.pickCard = function(card) {
			if ($scope.guessCard == card.name) {
				card.display = false;
				counter -= 1;
				if(counter > 1){
					$scope.guessCard = randomCard($scope.cards);
					$scope.cards = shuffleCards($scope.cards);
				}
				else {
					endTime = new Date();
					totalTime = endTime.getTime() - startTime.getTime();
					setTimeout(function(){
						alert("GAME OVER ~ time:"+totalTime);
					}, 500);
				}
			}
		}

		function randomCard(cards){
			var picked = false, cardIndex, cardName;
			while (picked == false){
				cardIndex = Math.floor(Math.random()*cards.length);
				if(cards[cardIndex].display){
					cardName = cards[cardIndex].name;
					picked = true;
				}
			}
			
			return cardName;
		}

		function shuffleCards(cards){
			var currentIndex = cards.length, 
				temp, randomIndex;
			//debugger;
		  	while (0 !== currentIndex) {

			  	if(!cards[currentIndex-1].display){
			  		currentIndex -= 1;
			  		continue;
			  	}

			    do{
					randomIndex = Math.floor(Math.random() * currentIndex);
					if(cards[randomIndex].display)
						break;
			    } while(true)

			    currentIndex -= 1;
			    temp = cards[currentIndex];
			    cards[currentIndex] = cards[randomIndex];
			    cards[randomIndex] = temp;
		  	}

		  	return cards;
		}
	}
]);
