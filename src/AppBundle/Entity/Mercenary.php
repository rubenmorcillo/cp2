<?php


namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\MercenaryRepository")
 * @ORM\Table(name="Mercenary")
 */
class Mercenary
{

    public function __construct()
    {
        $this->copys= new ArrayCollection();
    }

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @var int
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    private $name;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    private $image;


    /**
     * @ORM\Column(type="float")
     * @var float
     */
    private $hpBase;

    /**
     * @ORM\Column(type="float")
     * @var float
     */
    private $atqBase;

    /**
     * @ORM\Column(type="float")
     * @var float
     */
    private $defBase;

    /**
     * @ORM\Column(type="float")
     * @var float
     */
    private $velBase;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Rarity", inversedBy="mercenary")
     * @var Rarity
     */
    private $rarity;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Replic", mappedBy="mercenary")
     * @ORM\JoinColumn(nullable=true)
     * @var Replic[]
     */
    private $copys;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Mercenary
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param string $image
     * @return Mercenary
     */
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }


    /**
     * @return float
     */
    public function getHpBase()
    {
        return $this->hpBase;
    }

    /**
     * @param float $hpBase
     * @return Mercenary
     */
    public function setHpBase($hpBase)
    {
        $this->hpBase = $hpBase;
        return $this;
    }

    /**
     * @return float
     */
    public function getAtqBase()
    {
        return $this->atqBase;
    }

    /**
     * @param float $atqBase
     * @return Mercenary
     */
    public function setAtqBase($atqBase)
    {
        $this->atqBase = $atqBase;
        return $this;
    }

    /**
     * @return float
     */
    public function getDefBase()
    {
        return $this->defBase;
    }

    /**
     * @param float $defBase
     * @return Mercenary
     */
    public function setDefBase($defBase)
    {
        $this->defBase = $defBase;
        return $this;
    }

    /**
     * @return float
     */
    public function getVelBase()
    {
        return $this->velBase;
    }

    /**
     * @param float $velBase
     * @return Mercenary
     */
    public function setVelBase($velBase)
    {
        $this->velBase = $velBase;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getRarity()
    {
        return $this->rarity;
    }

    /**
     * @param mixed $rarity
     * @return Mercenary
     */
    public function setRarity($rarity)
    {
        $this->rarity = $rarity;
        return $this;
    }

    /**
     * @return Replic[]
     */
    public function getCopys()
    {
        return $this->copys;
    }

    /**
     * @param Replic[] $copys
     * @return Mercenary
     */
    public function setCopys($copys)
    {
        $this->copys = $copys;
        return $this;
    }

}