<?php
	
/*		$var = "salut";
	$arrayName = array('' => , );
	debug($arrayName);


	$var_2 = 3 + 2;
	$var[0] = $var_2;*/
	class Personnage {


		private $_force;
		private $_age;
		private $_style = "noir et blanc";

		public function stylePersonnage(){

			if($this->$_age > 50){

				echo $this->$_style;

			}else if ($this->$_age < 48){

				echo "test";
			}else{

			echo "deuxieme test";

			}

		}

		private function testFunction(){

			foreach ($variable as $key => $value) {
				# code...
			}
		}

		/*bloc de commentaire */

	}


?>