import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CampaignsOverview from '@/components/CampaignsOverview'
import CampaignForm from '@/components/CampaignForm'
import FindCreation from '@/components/FindForm'
import StructureCreation from '@/components/StructureForm'
import ExcavationForm from "../components/ExcavationForm";
import FallbackComponent from '@/components/FallbackComponent'
import SectionCreation from '@/components/SectionForm'
import SampleCreation from "../components/SampleForm"
import SectionOverview from "../components/SectionOverview";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      alias: '',
      component: Home
    },
    {
      path: '*',
      name: '404Page',
      component: FallbackComponent,
      meta: {
        title: 'Noch im Bau',
        showBackButton: true
      }
    },
    {
      path: '/campaigns',
      name: 'CampaignsOverview', // name is optional
      component: CampaignsOverview,
      meta: {
        title: 'Alle Projekte'
      }
    },
    {
      path: '/campaigns/:campaign_id',
      name: 'CampaignCreation',
      component: CampaignForm,
      meta: {
        title: 'Projekt bearbeiten'
      }
    },
    {
      path: '/campaigns/:campaign_id/excavations/:excavation_id',
      name: 'ExcavationForm',
      component: ExcavationForm,
      meta: {
        title: 'Ausgrabung'
      }
    },
    {
      path: '/campaigns/:campaign_id/excavations/:excavation_id/sections/:section_id',
      name: 'SectionOverview',
      component: SectionOverview,
      meta: {
        title: 'Schnitt anlegen'
      }
    },
    {
      path: '/campaigns/:campaign_id/excavations/:excavation_id/sections/:section_id',
      name: 'SectionCreation',
      component: SectionCreation,
      meta: {
        title: 'Schnitt anlegen'
      }
    },
    {
      path: '/campaigns/:campaign_id/excavations/:excavation_id/sections/:section_id/samples/:sample_id',
      name: 'SampleCreation',
      component: SampleCreation,
      meta: {
        title: 'Probe bearbeiten'
      }
    },
    {
      path: '/campaigns:campaign_id/excavations/:excavation_id/sections/:section_id/structures/:structure_id',
      name: 'StructureCreation',
      component: StructureCreation,
      meta: {
        title: 'Befund anlegen'
      }
    },
    {
      path: '/campaigns:campaign_id/excavations/:excavation_id/sections/:section_id/finds/:find_id',
      name: 'FindCreation',
      component: FindCreation,
      meta: {
        title: 'Fund bearbeiten'
      }
    }
  ]
})
